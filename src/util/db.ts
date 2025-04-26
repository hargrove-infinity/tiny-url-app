import { Prisma, PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  omit: { user: { password: true } },
} as Prisma.PrismaClientOptions);

async function testDBConnection(): Promise<void> {
  try {
    await prisma.$connect();
    console.log("✅ Database connection successful");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
}

async function testDBConnectionAndDisconnect(): Promise<void> {
  try {
    await prisma.$connect();
    console.log("✅ Database connection successful");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  } finally {
    await prisma.$disconnect();
    console.log("🔌 Database disconnected");
  }
}
