-- DropIndex
DROP INDEX "Link_shortener_key";

-- CreateIndex
CREATE INDEX "Link_shortener_idx" ON "Link"("shortener");
