import { Request, Response, NextFunction } from "express";
import {
  AnyObject,
  BodyType,
  ErrorObject,
  FormatResponseReturn,
  IFormatResponseArgs,
} from "./types";

function checkErrorObject(data?: BodyType): data is ErrorObject {
  return !!(data && typeof data === "object" && data.errors);
}

function formatResponse({
  req,
  body,
}: IFormatResponseArgs): FormatResponseReturn {
  const defaultBody = { path: req.path, method: req.method };

  return checkErrorObject(body)
    ? { ...defaultBody, errors: body.errors }
    : { ...defaultBody, payload: body === undefined ? {} : body };
}

function safelyParseJson(data: string): AnyObject | null {
  try {
    return JSON.parse(data);
  } catch (error) {
    return null;
  }
}

function checkFieldsExistence(data: AnyObject): boolean {
  return data.path && data.method && ("payload" in data || "errors" in data);
}

function isAlreadyFormattedResponse(data: unknown): boolean {
  if (typeof data !== "string") {
    return false;
  }

  const parsedData = safelyParseJson(data);

  if (parsedData === null) {
    return false;
  }

  return checkFieldsExistence(parsedData);
}

export function responseFormatter(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const originalSend = res.send;

  res.send = function (body: AnyObject) {
    if (isAlreadyFormattedResponse(body)) {
      return originalSend.call(this, body);
    }

    const formattedResponse = formatResponse({ req, body });
    return originalSend.call(this, formattedResponse);
  };

  next();
}
