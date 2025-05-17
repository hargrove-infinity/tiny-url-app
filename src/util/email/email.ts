import { ENV } from "@src/common";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: { user: ENV.SenderEmail, pass: ENV.SenderPassword },
});

const mailOptions = {
  from: { name: "Tiny url", address: ENV.SenderEmail },
  subject: "Hello",
  text: "Hello World!",
  html: "<b>Hello World!</b>",
};

export async function sendEmail(toEmails: string[]) {
  try {
    await transporter.sendMail({ ...mailOptions, to: toEmails });
    console.log("Email has been sent");
  } catch (error) {
    console.log("Send email error");
    console.log(error);
  }
}
