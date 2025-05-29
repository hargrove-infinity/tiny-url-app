import { Prisma, PrismaClient } from "@prisma/client";
import {
  DATABASE_CONNECTED_SUCCESSFULLY_MESSAGE,
  DATABASE_CONNECTION_FAILED_MESSAGE,
} from "@src/common";
import { pinoLogger } from "@src/logger";

export const prisma = new PrismaClient({
  omit: { user: { password: true } },
} as Prisma.PrismaClientOptions);

async function testDBConnection(): Promise<void> {
  try {
    await prisma.$connect();
    pinoLogger.info(DATABASE_CONNECTED_SUCCESSFULLY_MESSAGE);
  } catch (error) {
    pinoLogger.fatal(error, DATABASE_CONNECTION_FAILED_MESSAGE);
    process.exit(1);
  }
}

testDBConnection();
