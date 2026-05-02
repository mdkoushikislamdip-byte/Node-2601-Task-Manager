require("dotenv").config();
const nodemailer = require("nodemailer");
const { otpMailTemp } = require("./emailTamplates");


// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

const mailSender = async ({email, subject, otp }) => {
 try {
       await transporter.sendMail({
       from: `"TaskManager Team" <${process.env.SMTP_USER}>`, // sender address
        to: email, // list of recipients
        subject: subject, // subject line
        html: otpMailTemp(otp) , // HTML body
    });
 } catch (error) {
    console.log("Error while sending mail", error)
 }
}


module.exports = {
    mailSender
}