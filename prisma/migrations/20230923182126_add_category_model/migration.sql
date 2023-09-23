-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "category" TEXT;

-- CreateTable
CREATE TABLE "Category" (
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_category_fkey" FOREIGN KEY ("category") REFERENCES "Category"("name") ON DELETE CASCADE ON UPDATE CASCADE;
