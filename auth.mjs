import bcryptjs from 'bcryptjs';

const salt = await bcryptjs.genSalt(10);
const register = async (req, res, next) => {
    const {username, email, password} = req.body;
    const hashedPassword = await bcryptjs.hash(password, salt);
    const user = await User.create({username, email, password: hashedPassword});
}
const auth = async (req, res, next) => {
    const {username, password} = req.body;
    const user = await User.findOne({username});
    if (!user){
        console.log("USERNAME NOT FOUND")
    }
    const match = await bcryptjs.compare(password, user.password);
    if (!match){
        console.log("PASSWORD DOES NOT MATCH")
    }
    return user;
}