/*
  Warnings:

  - You are about to drop the column `name` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the `_PostCategories` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[category_name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `category_name` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category_id` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_PostCategories" DROP CONSTRAINT "_PostCategories_A_fkey";

-- DropForeignKey
ALTER TABLE "_PostCategories" DROP CONSTRAINT "_PostCategories_B_fkey";

-- DropIndex
DROP INDEX "Category_name_key";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "name",
ADD COLUMN     "category_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "category_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_PostCategories";

-- CreateIndex
CREATE UNIQUE INDEX "Category_category_name_key" ON "Category"("category_name");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("category_id") ON DELETE RESTRICT ON UPDATE CASCADE;
