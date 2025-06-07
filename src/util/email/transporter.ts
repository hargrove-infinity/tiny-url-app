import path from "path";
import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import { ENV } from "@src/common";

const viewsPath = path.join("src", "views");

export const transporter = nodemailer.createTransport({
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
