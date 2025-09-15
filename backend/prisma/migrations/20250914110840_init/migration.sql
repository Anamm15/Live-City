/*
  Warnings:

  - A unique constraint covering the columns `[userId,pollId]` on the table `PollVotes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `pollId` to the `PollVotes` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "PollVotes_userId_pollOptionId_key";

-- AlterTable
ALTER TABLE "PollVotes" ADD COLUMN     "pollId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PollVotes_userId_pollId_key" ON "PollVotes"("userId", "pollId");
