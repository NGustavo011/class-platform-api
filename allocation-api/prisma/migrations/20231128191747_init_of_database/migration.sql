-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "buyerId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3) NOT NULL DEFAULT NOW() + interval '1 year',

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);
