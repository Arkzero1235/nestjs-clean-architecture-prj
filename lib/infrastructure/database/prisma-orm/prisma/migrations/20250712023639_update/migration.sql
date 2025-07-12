/*
  Warnings:

  - You are about to drop the column `userId` on the `OrderDetail` table. All the data in the column will be lost.
  - You are about to drop the column `views` on the `Product` table. All the data in the column will be lost.
  - Made the column `orderId` on table `OrderDetail` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `storage` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OrderDetail" DROP CONSTRAINT "OrderDetail_orderId_fkey";

-- DropForeignKey
ALTER TABLE "OrderDetail" DROP CONSTRAINT "OrderDetail_userId_fkey";

-- AlterTable
ALTER TABLE "OrderDetail" DROP COLUMN "userId",
ALTER COLUMN "orderId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "views",
ADD COLUMN     "storage" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "OrderDetail" ADD CONSTRAINT "OrderDetail_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
