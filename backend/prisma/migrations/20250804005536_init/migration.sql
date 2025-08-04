/*
  Warnings:

  - You are about to drop the column `pollOptionsId` on the `PollVotes` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,pollOptionId]` on the table `PollVotes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `pollOptionId` to the `PollVotes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PollVotes" DROP CONSTRAINT "PollVotes_pollOptionsId_fkey";

-- DropIndex
DROP INDEX "PollVotes_userId_pollOptionsId_key";

-- AlterTable
ALTER TABLE "PollVotes" DROP COLUMN "pollOptionsId",
ADD COLUMN     "pollOptionId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PollVotes_userId_pollOptionId_key" ON "PollVotes"("userId", "pollOptionId");

-- AddForeignKey
ALTER TABLE "PollVotes" ADD CONSTRAINT "PollVotes_pollOptionId_fkey" FOREIGN KEY ("pollOptionId") REFERENCES "PollOptions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
