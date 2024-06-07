/*
  Warnings:

  - Added the required column `recruiterEmail` to the `JobOffer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "JobOffer" ADD COLUMN     "recruiterEmail" TEXT NOT NULL;
