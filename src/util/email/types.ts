import { SendMailOptions, Transporter } from "nodemailer";

export interface MailOptionsWithContext extends SendMailOptions {
  context: {
    userName: string;
    activationLink: string;
  };
}

interface ISendEmailConfirmContext {
  userName: string;
  activationLink: string;
}

export interface ISendEmailConfirmArgs {
  transporter: Transporter;
  toEmails: string[];
  context: ISendEmailConfirmContext;
}
