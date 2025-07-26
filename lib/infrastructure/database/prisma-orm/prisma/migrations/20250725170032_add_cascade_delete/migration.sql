-- DropForeignKey
ALTER TABLE "OrderDetail" DROP CONSTRAINT "OrderDetail_productId_fkey";

-- AddForeignKey
ALTER TABLE "OrderDetail" ADD CONSTRAINT "OrderDetail_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
