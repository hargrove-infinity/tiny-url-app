import path from "path";
import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import { ENV } from "@src/common";
import { ISendEmailConfirmArgs, MailOptionsWithContext } from "./types";

const viewsPath = path.join("src", "views");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: { user: ENV.SenderEmail, pass: ENV.SenderPassword },
});

transporter.use(
  "compile",
  hbs({
    viewEngine: {
      partialsDir: viewsPath,
      layoutsDir: viewsPath,
      defaultLayout: "baseLayout",
    },
    viewPath: viewsPath,
  })
);

const globalMailOptions = {
  from: { name: "Tiny url", address: ENV.SenderEmail },
};

const emailConfirmMailOptions = {
  ...globalMailOptions,
  subject: "Registration",
  template: "emailConfirm",
};

export async function sendEmailConfirm({
  toEmails,
  context,
}: ISendEmailConfirmArgs) {
  try {
    await transporter.sendMail({
      ...emailConfirmMailOptions,
      to: toEmails,
      context,
    } as MailOptionsWithContext);
    console.log("Email has been sent");
  } catch (error) {
    console.log("Send email error");
    console.log(error);
  }
}
