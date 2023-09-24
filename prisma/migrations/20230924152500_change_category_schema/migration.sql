/*
  Warnings:

  - A unique constraint covering the columns `[name,ownerid]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `Category` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Todo" DROP CONSTRAINT "Todo_category_fkey";

-- DropIndex
DROP INDEX "Category_name_key";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Category_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_ownerid_key" ON "Category"("name", "ownerid");

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_category_fkey" FOREIGN KEY ("category") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
