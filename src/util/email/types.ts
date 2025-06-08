import { ApplicationError } from "@src/common";
import { SendMailOptions, Transporter } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

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
  transporter: Transporter<
    SMTPTransport.SentMessageInfo,
    SMTPTransport.Options
  >;
  toEmails: string[];
  context: ISendEmailConfirmContext;
}

export type SendEmailConfirmResult = Promise<
  [SMTPTransport.SentMessageInfo, undefined] | [undefined, ApplicationError]
>;
