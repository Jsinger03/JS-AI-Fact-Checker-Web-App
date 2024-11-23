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
    You will produce a summary of the text which should explain what the text is about, not a summation of its different facts and inaccuracies, and return that to me in a JSON along with the fact checked text in this format factCheckResult: [{ textSegment: String, suggestion:  String, accurate: Boolean,}]. The entirety of the text should be in that format, with accurate parts as true and innacurate parts as false. An accuracy score should be returned as well in that JSON as the third thing (accuracyScore: Number), as a rating of how accurate the text was on a scale of 0-100. The output I want back MUST be in JSON format, with summary, factCheckResult, and accuracyScore as I have outlined. ALL ELEMENTS MUST BE PRESENT. THERE SHOULD NEVER BE A SCENARIO WHERE YOU SEND BACK ANY OF THOSE FIELDS AS BLANK (OR AN EMPTY ARRAY IN THE CASE OF factCheckResult, which should cover the entirety of the original text. Every false statement MUST have some suggestion of what is inaccurate)
    You will not output anything else in your response except for the desired output.
    Here is an example: if the text is "There once was a man named Jack who captained a pirate ship known as the White Pearl. This ship sailed in space, and the actor who played Jack in films was Johnny Depp.", the summary should be "This is a story about a pirate captain named Jack, and describes his ship and the actor who plays him. This text contains several innaccuracies.", and the fact checking would reveal that the ship was the Black Pearl, and that it sailed the seas, not space. The bit about Johhny Depp is accurate, and as such would not be mentioned in the fact checking
    You would produce that summary and factCheckResult in the specified JSON format, with the start index corresponding to the character index of the start of an innaccuracy, and end corresponding to the endpoint of that inaccuracy.
    Indexes should include spaces and punctuation. In the given example, the start index of the inaccuracy "White Pearl" would be 73, and the end index would be 84, while the start index of "sailed in space" would be 96, and the end index would be 111.
    `
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: prompt },
                { role: "user", content: originalText },
            ],
        });

        const response = completion.choices[0].message.content;

        // Log the response to check its format
        console.log('OpenAI API response:', response);

        // Attempt to parse the response
        let parsedResponse;
        try {
            parsedResponse = JSON.parse(response);
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            throw new Error('Invalid JSON response from OpenAI API');
        }

        const { summary, factCheckResult, accuracyScore } = parsedResponse;

        if (typeof accuracyScore !== 'number') {
            throw new Error('Invalid accuracyScore in response');
        }

        const newQuery = new Query({
            user: new mongoose.Types.ObjectId(userId),
            originalText,
            summary,
            factCheckResult,
            accuracyScore,
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