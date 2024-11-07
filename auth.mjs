import bcryptjs from 'bcryptjs';
import './db.mjs';
import mongoose from 'mongoose';

const User = mongoose.model('User');
const Query = mongoose.model('Query');

const salt = await bcryptjs.genSalt(10);
const register = async (req, res) => {
    const {username, email, password, ConfirmPassword} = req.body;
    const hashedPassword = await bcryptjs.hash(password, salt);
    const confirmPassword = await bcryptjs.hash(ConfirmPassword, salt);
    if (password !== confirmPassword){
        console.log("PASSWORDS DO NOT MATCH")
    }
    if (User.findOne({username})){
        console.log("USERNAME ALREADY EXISTS")
    }
    if (User.findOne({email})){
        console.log("An account with this email already exists. Please use another email")
    }
    const user = await User.create({username, email, password: hashedPassword});
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
//const changePassword = async (req, res) => {



export {register, auth};