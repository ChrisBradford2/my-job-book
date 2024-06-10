/*
  Warnings:

  - You are about to drop the column `resetPasswordTokenExpiry` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "resetPasswordTokenExpiry",
ADD COLUMN     "resetPasswordExpires" TIMESTAMP(3);
