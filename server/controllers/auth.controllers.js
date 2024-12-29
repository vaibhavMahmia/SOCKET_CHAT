import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import { generateTokenAndSetCookie } from "../utils/generateToken.js";
import { io } from "../socket/socket.js";

export const signup = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;
        if (password !== confirmPassword)
            return res.status(400).json({ error: 'Passwords don\'t match !' });
        const user = await User.findOne({ username });
        if (user)
            return res.status(400).json({ error: 'Username already exists !' });
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        const newUser = new User({ fullName, username, password: hashedPassword, gender, profilePic: gender === 'male' ? boyProfilePic : girlProfilePic });
        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();
            const emitUser = {
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic
            }
            io.emit("newUser", emitUser);
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic
            });
        } else {
            res.status(400).json({ error: 'internal server Error !' });
        }

    } catch (error) {
        console.log('Error in signup controller: ', error.message);
        res.status(500).json({ error: 'internal server Error !' });
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if(!username || !password)
            return res.status(400).json({ error: 'All fields are required !' });
        const user = await User.findOne({ username });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || '');
        if(!user || !isPasswordCorrect)
            return res.status(400).json({ error: 'Invalid credentials !' });
        generateTokenAndSetCookie(user._id, res);
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic
        });
    } catch (error) {
        console.log('Error in login controller: ', error.message);
        res.status(500).json({ error: 'internal server Error !' });
    }
}

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: 'Logged Out Successfully !' });
    } catch (error) {
        console.log('Error in logout controller: ', error.message);
        res.status(500).json({ error: 'internal server Error !' });
    }
}