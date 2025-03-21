/*
  Warnings:

  - A unique constraint covering the columns `[shortener]` on the table `Link` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Link_shortener_key" ON "Link"("shortener");
