-- Drop Foreign Key User in Table Link
ALTER TABLE "Link" DROP CONSTRAINT "Link_userId_fkey";

-- Set on delete RESTRICT
ALTER TABLE "Link" ADD CONSTRAINT "Link_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
