import pinoHttp from "pino-http";
import pino from "pino";

export const pinoLogger = pino({ transport: { target: "pino-pretty" } });

export const pinoLoggerHttp = pinoHttp({
  transport: {
    target: "pino-pretty",
  },
  customLogLevel: (req, res, err) => {
    if (res.statusCode >= 400) {
      return "error";
    }

    return "silent";
  },
  customSuccessMessage: (req, res) => {
    if (res.statusCode >= 400) {
      return `Error occurred: ${req.method} ${req.url} - ${res.statusCode}`;
    }

    return `Message: ${req.method} ${req.url} - ${res.statusCode}`;
  },
  customErrorMessage: (req, res, err) => {
    return `Error occurred: ${req.method} ${req.url} - ${res.statusCode} - ${err?.message}`;
  },
});
