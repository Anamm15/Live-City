/*
  Warnings:

  - You are about to drop the column `usersId` on the `NewsComments` table. All the data in the column will be lost.
  - You are about to drop the column `usersId` on the `NewsReactions` table. All the data in the column will be lost.
  - You are about to drop the column `pollsId` on the `PollOptions` table. All the data in the column will be lost.
  - You are about to drop the column `usersId` on the `PollVotes` table. All the data in the column will be lost.
  - You are about to drop the column `usersId` on the `Reports` table. All the data in the column will be lost.
  - You are about to drop the column `usersId` on the `Submissions` table. All the data in the column will be lost.
  - You are about to drop the column `familiesId` on the `Users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,newsId]` on the table `NewsReactions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,pollOptionsId]` on the table `PollVotes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Communities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `CommunityMembers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Facilities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Families` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Files` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `News` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `NewsComments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `NewsComments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `NewsReactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `NewsReactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pollId` to the `PollOptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `PollOptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `PollVotes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `PollVotes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Polls` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Reports` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Reports` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `RewardLogs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Submissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Submissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `familyId` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Villages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "Religion" ADD VALUE 'JUDAISM';

-- DropForeignKey
ALTER TABLE "NewsComments" DROP CONSTRAINT "NewsComments_usersId_fkey";

-- DropForeignKey
ALTER TABLE "NewsReactions" DROP CONSTRAINT "NewsReactions_usersId_fkey";

-- DropForeignKey
ALTER TABLE "PollOptions" DROP CONSTRAINT "PollOptions_pollsId_fkey";

-- DropForeignKey
ALTER TABLE "PollVotes" DROP CONSTRAINT "PollVotes_usersId_fkey";

-- DropForeignKey
ALTER TABLE "Reports" DROP CONSTRAINT "Reports_usersId_fkey";

-- DropForeignKey
ALTER TABLE "Submissions" DROP CONSTRAINT "Submissions_usersId_fkey";

-- DropForeignKey
ALTER TABLE "Users" DROP CONSTRAINT "Users_familiesId_fkey";

-- DropIndex
DROP INDEX "NewsReactions_usersId_newsId_key";

-- DropIndex
DROP INDEX "PollVotes_usersId_pollOptionsId_key";

-- AlterTable
ALTER TABLE "Communities" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "CommunityMembers" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Facilities" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Families" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Files" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "News" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "NewsComments" DROP COLUMN "usersId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "NewsReactions" DROP COLUMN "usersId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "PollOptions" DROP COLUMN "pollsId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "pollId" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "PollVotes" DROP COLUMN "usersId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Polls" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Reports" DROP COLUMN "usersId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "RewardLogs" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Submissions" DROP COLUMN "usersId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "familiesId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "familyId" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Villages" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "NewsReactions_userId_newsId_key" ON "NewsReactions"("userId", "newsId");

-- CreateIndex
CREATE UNIQUE INDEX "PollVotes_userId_pollOptionsId_key" ON "PollVotes"("userId", "pollOptionsId");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES "Families"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PollOptions" ADD CONSTRAINT "PollOptions_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "Polls"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PollVotes" ADD CONSTRAINT "PollVotes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reports" ADD CONSTRAINT "Reports_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submissions" ADD CONSTRAINT "Submissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewsComments" ADD CONSTRAINT "NewsComments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewsReactions" ADD CONSTRAINT "NewsReactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
