import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import { generateToken, generateTokenAndSetCookie } from "../utils/generateToken.js";
import { io } from "../socket/socket.js";
import { mailOptions, transporter } from "../utils/sendMail.js";
import jwt from 'jsonwebtoken';

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
            await newUser.save();
            const protocol = req.protocol;
            const host = req.get('host');
            const token = generateToken(newUser._id);
            const fullUrl = `${protocol}://${host}/api/auth/verify/${token}`;
            const mail_options = mailOptions(newUser.username, 'Verify your Account', newUser.fullName, fullUrl);
            console.log(process.env.NODE_MAILER_EMAIL)
            console.log(process.env.NODE_MAILER_PASSWORD)

            await transporter.sendMail(mail_options, (error, info) => {
                if (error) console.log('Error occurred: ' + error.message);
                console.log('Message sent');
            });
            res.status(201).json({
                message: 'please verify your email'
            });
        } else {
            res.status(400).json({ error: 'internal server Error !' });
        }

    } catch (error) {
        console.log('Error in signup controller: ', error.message);
        res.status(500).json({ error: 'internal server Error !' });
    }
}

export const verify = async (req, res) => {
    try {
        const { token } = req.params;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded)
            return res.status(401).json({ error: 'Token Expired !' });
        const user = await User.findByIdAndUpdate(decoded.userId, { verified: true }, { new: true, runValidators: true }).select('-password');
        const emitUser = {
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic
        }
        io.emit("newUser", emitUser);
        generateTokenAndSetCookie(user._id, res);
        res.redirect('/');
    } catch (error) {
        res.status(500).json({ error: 'internal server Error !' });
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password)
            return res.status(400).json({ error: 'All fields are required !' });
        const user = await User.findOne({ username });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || '');
        if (!user || !isPasswordCorrect)
            return res.status(400).json({ error: 'Invalid credentials !' });
        if (!user.verified)
            return res.status(400).json({ error: 'Mail is not verified !' });
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