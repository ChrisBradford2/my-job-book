-- AlterTable
ALTER TABLE "JobOffer" ALTER COLUMN "recruiterEmail" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'user';
