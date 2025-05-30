-- Drop Foreign Key User in Table Link
ALTER TABLE "Link" DROP CONSTRAINT "Link_userId_fkey";

-- Make userId optional
ALTER TABLE "Link" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;