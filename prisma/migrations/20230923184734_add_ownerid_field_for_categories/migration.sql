/*
  Warnings:

  - Added the required column `ownerid` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "ownerid" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_ownerid_fkey" FOREIGN KEY ("ownerid") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
