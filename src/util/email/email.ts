import { ENV } from "@src/common";
import { pinoLogger } from "@src/logger";
import { ISendEmailConfirmArgs, MailOptionsWithContext } from "./types";

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
}: ISendEmailConfirmArgs) {
  try {
    await transporter.sendMail({
      ...emailConfirmMailOptions,
      to: toEmails,
      context,
    } as MailOptionsWithContext);
    pinoLogger.info("Email has been sent");
  } catch (error) {
    pinoLogger.info({ error: error.message }, "Send email error");
  }
}
