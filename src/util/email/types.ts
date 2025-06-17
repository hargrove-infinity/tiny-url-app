import { ApplicationError } from "@src/common";
import { SendMailOptions, Transporter } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export interface MailOptionsWithContext extends SendMailOptions {
  context: ISendSignUpLinkEmailContext;
}

interface ISendSignUpLinkEmailContext {
  userName: string;
  signUpLink: string;
}

export interface ISendSignUpLinkEmailArgs {
  transporter: Transporter<
    SMTPTransport.SentMessageInfo,
    SMTPTransport.Options
  >;
  toEmails: string[];
  context: ISendSignUpLinkEmailContext;
}

export type SendSignUpLinkEmailResult = Promise<
  [SMTPTransport.SentMessageInfo, undefined] | [undefined, ApplicationError]
>;
