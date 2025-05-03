import nodemailer from 'nodemailer';

// Create a transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'vaibhavwwe76@gmail.com',
        pass: 'jzio gyqu ljvf lljr' // Use your App Password here
    }
});

// Set up email data
const mailOptions = (to, subject, uname) => {
    const mail_options = {
        from: 'vaibhavwwe76@gmail.com', // sender address
        to, // list of receivers
        subject, // Subject line
        html: `
            <h1>Hello</h1>
            <u>${uname}</u>
        `
    };
    return mail_options;
}


// Send mail

const mail_options = mailOptions('vaibhavwwe76@gmail.com', 'verify your account', 'vaibhavM');
transporter.sendMail(mail_options, (error, info) => {
    if (error) {
        return console.log('Error occurred: ' + error.message);
    }
    console.log('Message sent: %s', info.messageId);
});