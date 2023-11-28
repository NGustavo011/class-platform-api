/*
  Warnings:

  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Order";

-- CreateTable
CREATE TABLE "RegistrationAgreement" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "buyerId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3) NOT NULL DEFAULT NOW() + interval '1 year',

    CONSTRAINT "RegistrationAgreement_pkey" PRIMARY KEY ("id")
);
