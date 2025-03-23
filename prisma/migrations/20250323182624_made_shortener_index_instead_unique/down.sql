-- DropIndex
DROP INDEX "Link_shortener_idx";

-- CreateIndex
CREATE UNIQUE INDEX "Link_shortener_key" ON "Link"("shortener" ASC);

