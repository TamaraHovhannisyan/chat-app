import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";


export const login = (req, res)=>{
    res.send("Welcome")
    
}

export const logout = (req, res)=>{
    res.send("Welcome")
    
}

export const signup = async(req, res)=>{
    try {
        const {fullName, username, password, confirmPassword, gender} = req.body;
        if(password !== confirmPassword) {
            return res.status(400).json({error: "Passwords do not match"});
        }
        const user = await  User.findOne({username});
        if(user){
            return res.status(400).json({error:"User already exits"});
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullName,
            username,
            password:hashedPassword,
            gender,
            profilePic: gender ==='male'? boyProfilePic: girlProfilePic
        })

        if(newUser){
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                _id:newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic
            });
        }

    } catch (error) {
        console.log("Error in signup controller", + error.message);
        
        res.status(500).json({error:"Internal Server Error"})
    }
    
}