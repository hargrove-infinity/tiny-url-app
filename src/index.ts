import { ENV } from "@src/common";
import { pinoLogger } from "@src/logger";
import { app as server } from "./server";

/******************************************************************************
                                  Run
******************************************************************************/

const SERVER_START_MSG =
  "Express server started on port: " + ENV.Port.toString();

server.listen(ENV.Port, () => pinoLogger.info(SERVER_START_MSG));
