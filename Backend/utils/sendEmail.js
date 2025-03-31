import nodeMailer from 'nodemailer';
import dotenv from 'dotenv';
// dotenv.config({path:'backend/config/config.env'});
dotenv.config();

const sendEmail = async (options) => {
    const transporter = nodeMailer.createTransport({
        service: process.env.SMTP_SERVICE,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD, // Use your app password here
        },
    });

    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    // console.log(mailOptions);

    await transporter.sendMail(mailOptions);
};

export { sendEmail };
