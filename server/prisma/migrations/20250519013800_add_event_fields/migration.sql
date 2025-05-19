/*
  Warnings:

  - Added the required column `seatsBooked` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ticketPrice` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ticketsSold` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "seatsBooked" INTEGER NOT NULL,
ADD COLUMN     "ticketPrice" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "ticketsSold" INTEGER NOT NULL;
