import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    secure: "true",
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

const BASE_URL = process.env.PRODUCTION_URL || `http://localhost:${process.env.PORT}`;

export const sendEmail = async (to, subject, body, listId, userId) => {
    try {
        const unsubscribeLink = `${BASE_URL}/api/v1/user/unsubscribe/${listId}/${userId}`;
        const htmlBody = `${body}<br><br><a href="${unsubscribeLink}">Unsubscribe</a>`;

        const mailOptions = {
            from: process.env.SMTP_USER,
            to,
            subject,
            html: htmlBody,
        };

        await transporter.sendMail(mailOptions, (error, emailResponse) => {
            if (error)
                throw error
            else
                console.log("SUCESSFULY SENT MAIL", emailResponse)
        });

    } catch (error) {
        console.log(error)
    }
};
