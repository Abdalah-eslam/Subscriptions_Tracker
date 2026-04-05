import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";
import mongoose from "mongoose";
export const Login = async(req, res, next) => {
    const { email } = req.body;
    const password = String(req.body.password);
    try {
        const user = await User.findOne({ email });
        if (!user) {
            const error = new Error("User not found");
                error.status = 404;
                throw error;
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            const error = new Error("Incorrect password");
            error.status = 401;
            throw error;
        }
        const Token =jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        res.cookie("token", Token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000 // 1 day
});
        res.status(200).json({ success: true, message: "Login successful", data: {Token , User : user} });
    } catch (error) {
        next(error);
    }
}

export const Register = async(req, res, next) => {
    const {name, email} = req.body;
    const password = String(req.body.password);
    const session= await mongoose.startSession();
    session.startTransaction();
    try {
        const existingUser = await User.findOne( { email }).session(session);
        if (existingUser) {
            await session.abortTransaction();
            session.endSession();
            const erorr = new Error("User already exists");
            erorr.status = 409;
            throw erorr;
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({ name, email, password: hashedPassword });
        const Token =jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        await newUser.save({ session });
        await session.commitTransaction();
        session.endSession();
        res.status(201).json({ success: true, message: "User registered successfully", data: {Token , User : newUser} });
        
    } catch (error) {
        if(session.inTransaction()) {
        await session.abortTransaction();
    }
        session.endSession();
        res.status(500).json({ success: false, message: "Registration failed", error: error.message });
        
    }
}

export const Signout = async(req, res) => {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Signout successful" });
}