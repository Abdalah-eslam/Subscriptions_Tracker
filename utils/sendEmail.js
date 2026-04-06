import dayjs from "dayjs";
import {emailTemplates} from "../utils/emailTemplet.js";
import Trancporter,{ EMAIL_USERNAME } from "../config/nodemailer.js";

const sendEmail = async function (to, subscription) {
    if (!to || !subscription) return;
    const temp = emailTemplates[0];
    const emailINFO = {
        username: subscription.user.name,
        subscriptionName: subscription.name,
        renewalDate: dayjs(subscription.renewalDate).format("MMM D- YYYY"),
        planName: subscription.name,
        price: `${subscription.price} ${subscription.currency}/${subscription.frequency}`,
        paymentMethod: subscription.paymentMethod,
        supportLink: subscription.supportLink,
    };
    const massage = temp.generateBody(emailINFO);
    const subject = temp.generateSubject(emailINFO);
    const mailOptions = {
        from: EMAIL_USERNAME,
        to :to,
        subject : subject,
        html: massage,
    }
    await Trancporter.sendMail(mailOptions)
    }

    export  default sendEmail