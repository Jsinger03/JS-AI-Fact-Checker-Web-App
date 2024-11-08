import { OpenAI } from "openai";
import './config.mjs';
import './db.mjs';
import mongoose from 'mongoose';


const Query = mongoose.model('Query');
const User = mongoose.model('User');

const saveQuery = async (originalText, userId) => {
    if (!originalText) {
        throw new Error("Original text is required");
    }

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error("Invalid user ID");
    }

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const prompt = `
    You are a helpful researcher and writer. You are given text inputs and you read through them, fact checking as you go. 
    You will produce a summary of the text which should explain what the text is about, not a summation of its different facts and inaccuracies, and return that to me in a JSON along with the fact checked text in this format factCheckResult: [{ textSegment: String, suggestion:  String, startIndex:  Number, endIndex:    Number,}]. 
    You will not output anything else in your response except for the desired output.
    Here is an example: if the text is "There once was a man named Jack who captained a pirate ship known as the White Pearl. This ship sailed in space, and the actor who played Jack in films was Johnny Depp.", the summary should be "This is a story about a pirate captain named Jack, and describes his ship and the actor who plays him. This text contains several innaccuracies.", and the fact checking would reveal that the ship was the Black Pearl, and that it sailed the seas, not space.
    You would produce that summary and factCheckResult in the speciied JSON format.
    `
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: prompt },
                    
                {
                    role: "user",
                    content: originalText,
                },
            ],
        });

        const response = completion.choices[0].message.content;
        const { summary, factCheckResult } = JSON.parse(response);

        const newQuery = new Query({
            user: new mongoose.Types.ObjectId(userId),
            originalText,
            summary,
            factCheckResult,
            accuracyScore: 0,
        });

        await newQuery.save();

        const user = await User.findById(userId);
        if (user) {
            user.queries.push(newQuery._id);
            await user.save();
        }

        return newQuery._id;
    } catch (error) {
        console.error('Error during OpenAI API call or database operation:', error);
        throw error;
    }
}

export default saveQuery;