import { Request, Response, NextFunction } from "express";
import { AnyObject, BodyType } from "./types";

function formatResponse({ req, body }: { req: Request; body?: BodyType }) {
  return {
    path: req.path,
    method: req.method,
    payload: body === undefined ? {} : body,
  };
}

function safelyParseJson(data: string): AnyObject | null {
  try {
    return JSON.parse(data);
  } catch (error) {
    return null;
  }
}

function checkFieldsExistence(data: AnyObject): boolean {
  return data.path && data.method && ("payload" in data || "error" in data);
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
) {
  const originalSend = res.send;

  res.send = function (body: any) {
    if (isAlreadyFormattedResponse(body)) {
      return originalSend.call(this, body);
    }

    const formattedResponse = formatResponse({ req, body });
    return originalSend.call(this, formattedResponse);
  };

  next();
}
