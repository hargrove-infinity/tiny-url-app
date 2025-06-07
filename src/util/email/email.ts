import SMTPTransport from "nodemailer/lib/smtp-transport";
import { ENV } from "@src/common";
import { pinoLogger } from "@src/logger";
import { asyncTryCatch } from "../asyncTryCatch";
import { AppErrorService } from "../AppErrorService";
import {
  ISendEmailConfirmArgs,
  MailOptionsWithContext,
  SendEmailConfirmResult,
} from "./types";

const globalMailOptions = {
  from: { name: "Tiny url", address: ENV.SenderEmail },
};

const emailConfirmMailOptions = {
  ...globalMailOptions,
  subject: "Registration",
  template: "emailConfirm",
};

export async function sendEmailConfirm({
  transporter,
  toEmails,
  context,
}: ISendEmailConfirmArgs): SendEmailConfirmResult {
  const res = transporter.sendMail({
    ...emailConfirmMailOptions,
    to: toEmails,
    context,
  } as MailOptionsWithContext);

  pinoLogger.info("Sending email confirm template");

  const [, error] = await asyncTryCatch<SMTPTransport.SentMessageInfo, Error>(
    res
  );

  if (error) {
    pinoLogger.info({ error: error.message }, "Send email error");
    return [, AppErrorService.Email.emailConfirmationError()];
  }

  pinoLogger.info("Email has been sent");
}
