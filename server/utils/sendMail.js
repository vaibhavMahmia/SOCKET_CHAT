import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
// Create a transporter
export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NODE_MAILER_EMAIL,
        pass: process.env.NODE_MAILER_PASSWORD
    }
});

// Set up email data
export const mailOptions = (to, subject, fullName, link) => {
    const mail_options = {
        from: 'vaibhavwwe76@gmail.com', // sender address
        to, // list of receivers
        subject, // Subject line
        html: `
            <h1>Hello ${fullName}</h1>
            <p>Please verify your email</p>
            <a href=${link}>${link}</a>
        `
    };
    return mail_options;
}


// Send mail

// const mail_options = mailOptions('vaibhavwwe76@gmail.com', 'verify your account', 'vaibhavM');
// transporter.sendMail(mail_options, (error, info) => {
//     if (error) {
//         return console.log('Error occurred: ' + error.message);
//     }
//     console.log('Message sent: %s', info.messageId);
// });