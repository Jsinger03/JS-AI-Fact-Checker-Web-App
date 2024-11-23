import bcryptjs from 'bcryptjs';
import './db.mjs';
import mongoose from 'mongoose';

const User = mongoose.model('User');
const Query = mongoose.model('Query');

const salt = await bcryptjs.genSalt(10);
const register = async (req, res) => {
    try {
        const { username, email, password, confirmPassword } = req.body;

        //Check if passwords match
        if (password !== confirmPassword) {
            console.log("PASSWORDS DO NOT MATCH");
            return false;
        }

        //Check if username or email already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            console.log("Username or email already exists");
            return false;
        }
        const hashedPassword = await bcryptjs.hash(password, salt);
        const confirmedHashedPassword = await bcryptjs.hash(confirmPassword, salt);
        const user = await User.create({username, email, password: hashedPassword});
        await user.save();
        return user;
    } catch (error) {
        console.error("Error during registration:", error);
        return false;
    }
}
const auth = async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({username});
    if (!user){
        console.log("USERNAME NOT FOUND")
        return false;
    }
    const match = await bcryptjs.compare(password, user.password);
    if (!match){
        console.log("PASSWORD DOES NOT MATCH")
        return false;
    }
    return user;
}



export {register, auth};