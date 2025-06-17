import SMTPTransport from "nodemailer/lib/smtp-transport";
import { ENV } from "@src/common";
import { pinoLogger } from "@src/logger";
import { asyncTryCatch } from "../asyncTryCatch";
import { AppErrorService } from "../AppErrorService";
import {
  ISendSignUpLinkEmailArgs,
  MailOptionsWithContext,
  SendSignUpLinkEmailResult,
} from "./types";

const globalMailOptions = {
  from: { name: "Tiny url", address: ENV.SenderEmail },
};

const emailConfirmMailOptions = {
  ...globalMailOptions,
  subject: "Registration",
  template: "signUpLinkEmail",
};

export async function sendSignUpLinkEmail({
  transporter,
  toEmails,
  context,
}: ISendSignUpLinkEmailArgs): SendSignUpLinkEmailResult {
  const res = transporter.sendMail({
    ...emailConfirmMailOptions,
    to: toEmails,
    context,
  } as MailOptionsWithContext);

  pinoLogger.info("Sending sign up link email template");

  const [data, error] = await asyncTryCatch<
    SMTPTransport.SentMessageInfo,
    Error
  >(res);

  if (error) {
    pinoLogger.info({ error: error.message }, "Send sign up link email error");
    return [, AppErrorService.Email.signUpLinkEmailError()];
  }

  pinoLogger.info("Sign up link email has been sent");
  return [data, undefined];
}
