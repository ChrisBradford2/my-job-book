-- AlterTable
ALTER TABLE "JobOffer" ADD COLUMN     "interviewDate" TIMESTAMP(3),
ALTER COLUMN "status" SET DEFAULT 'Ready to apply',
ALTER COLUMN "applicationDate" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "JobOffer_userId_idx" ON "JobOffer"("userId");
