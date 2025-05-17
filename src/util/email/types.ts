import { SendMailOptions } from "nodemailer";

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
  toEmails: string[];
  context: ISendEmailConfirmContext;
}
