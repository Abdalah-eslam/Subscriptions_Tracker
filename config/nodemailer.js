import nodemailer from "nodemailer";
import {EMAIL_PASSWORD} from "../config/env.js";
export const EMAIL_USERNAME = "abdallaheslam2001@gmail.com";
const trancporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: EMAIL_USERNAME,
            pass: EMAIL_PASSWORD,
        },
    });

export default trancporter