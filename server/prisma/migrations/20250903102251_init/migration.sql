-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "emailadd" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAtDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Transaction" (
    "id" SERIAL NOT NULL,
    "senderIdnumber" INTEGER NOT NULL,
    "recipients" TEXT NOT NULL,
    "amounts" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL,
    "statusT" TEXT NOT NULL,
    "createdAtDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_emailadd_key" ON "public"."User"("emailadd");

-- AddForeignKey
ALTER TABLE "public"."Transaction" ADD CONSTRAINT "Transaction_senderIdnumber_fkey" FOREIGN KEY ("senderIdnumber") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
