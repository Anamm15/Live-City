/*
  Warnings:

  - A unique constraint covering the columns `[shortId]` on the table `News` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[shortId]` on the table `Polls` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[shortId]` on the table `Reports` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[shortId]` on the table `Submissions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `shortId` to the `News` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortId` to the `Polls` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortId` to the `Reports` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortId` to the `Submissions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "NewsComments" DROP CONSTRAINT "NewsComments_newsId_fkey";

-- DropForeignKey
ALTER TABLE "NewsComments" DROP CONSTRAINT "NewsComments_userId_fkey";

-- DropForeignKey
ALTER TABLE "NewsReactions" DROP CONSTRAINT "NewsReactions_newsId_fkey";

-- DropForeignKey
ALTER TABLE "NewsReactions" DROP CONSTRAINT "NewsReactions_userId_fkey";

-- AlterTable
ALTER TABLE "Facilities" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Files" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "News" ADD COLUMN     "shortId" TEXT NOT NULL,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "NewsComments" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "NewsReactions" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Polls" ADD COLUMN     "shortId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Reports" ADD COLUMN     "shortId" TEXT NOT NULL,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Submissions" ADD COLUMN     "shortId" TEXT NOT NULL,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Villages" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "News_shortId_key" ON "News"("shortId");

-- CreateIndex
CREATE UNIQUE INDEX "Polls_shortId_key" ON "Polls"("shortId");

-- CreateIndex
CREATE UNIQUE INDEX "Reports_shortId_key" ON "Reports"("shortId");

-- CreateIndex
CREATE UNIQUE INDEX "Submissions_shortId_key" ON "Submissions"("shortId");

-- AddForeignKey
ALTER TABLE "NewsComments" ADD CONSTRAINT "NewsComments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewsComments" ADD CONSTRAINT "NewsComments_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "News"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewsReactions" ADD CONSTRAINT "NewsReactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewsReactions" ADD CONSTRAINT "NewsReactions_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "News"("id") ON DELETE CASCADE ON UPDATE CASCADE;
