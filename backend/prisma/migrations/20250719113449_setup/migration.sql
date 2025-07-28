-- CreateEnum
CREATE TYPE "EconomicStatus" AS ENUM ('UPPER', 'UPPER_MIDDLE', 'MIDDLE', 'LOWER_MIDDLE', 'LOWER', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "Religion" AS ENUM ('ISLAM', 'CHRISTIAN', 'CATHOLIC', 'HINDU', 'BUDDHIST', 'CONFUCIAN');

-- CreateEnum
CREATE TYPE "MaritalStatus" AS ENUM ('NEVER_MARRIED', 'MARRIED', 'DIVORCED', 'WIDOWED');

-- CreateEnum
CREATE TYPE "Education" AS ENUM ('ELEMENTARY', 'MIDDLE_SCHOOL', 'HIGH_SCHOOL', 'DIPLOMA_3', 'DIPLOMA_4', 'BACHELOR', 'MASTER', 'DOCTORATE', 'NO_SCHOOLING');

-- CreateEnum
CREATE TYPE "Occupation" AS ENUM ('CIVIL_SERVANT', 'MILITARY', 'POLICE', 'PRIVATE_EMPLOYEE', 'ENTREPRENEUR', 'STUDENT', 'UNEMPLOYED', 'OTHER');

-- CreateEnum
CREATE TYPE "ReportCategory" AS ENUM ('CLEANLINESS', 'SECURITY', 'INFRASTRUCTURE', 'PUBLIC_SERVICE', 'ENVIRONMENT', 'SOCIAL', 'EDUCATION', 'HEALTH', 'TRANSPORTATION', 'HOUSING', 'OTHER');

-- CreateEnum
CREATE TYPE "ReportStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED');

-- CreateEnum
CREATE TYPE "SubmissionCategory" AS ENUM ('ID_CARD', 'FAMILY_CARD', 'POLICE_CLEARANCE', 'BUSINESS_CERTIFICATE', 'DOMICILE_CERTIFICATE', 'POVERTY_CERTIFICATE', 'EVENT_PERMIT', 'MICRO_BUSINESS_LICENSE', 'INHERITANCE_CERTIFICATE', 'HEIR_CERTIFICATE', 'DEATH_CERTIFICATE', 'BIRTH_CERTIFICATE', 'MARRIAGE_CERTIFICATE', 'DIVORCE_CERTIFICATE', 'COVER_LETTER');

-- CreateEnum
CREATE TYPE "SubmissionStatus" AS ENUM ('PENDING', 'PROCESSING', 'REJECTED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "PollsType" AS ENUM ('VOTING', 'SURVEY');

-- CreateEnum
CREATE TYPE "PollsStatus" AS ENUM ('ACTIVE', 'CLOSED');

-- CreateEnum
CREATE TYPE "CommunityRole" AS ENUM ('MEMBER', 'ADMIN', 'MODERATOR');

-- CreateEnum
CREATE TYPE "FileableType" AS ENUM ('VILLAGE', 'FACILITY', 'COMMUNITY', 'NEWS', 'SUBMISSION', 'REPORT', 'USER');

-- CreateTable
CREATE TABLE "Families" (
    "id" SERIAL NOT NULL,
    "familyNumber" TEXT NOT NULL,
    "headFamily" VARCHAR(100) NOT NULL,
    "economicStatus" "EconomicStatus" NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "Families_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "nationalIdentityNumber" CHAR(16) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" TEXT,
    "password" VARCHAR(255) NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 0,
    "gender" "Gender" NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "birthplace" TEXT NOT NULL,
    "religion" "Religion" NOT NULL,
    "maritalStatus" "MaritalStatus",
    "education" "Education",
    "job" "Occupation",
    "phoneNumber" TEXT,
    "familiesId" INTEGER NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RewardLogs" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "points" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "RewardLogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Polls" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "PollsType" NOT NULL,
    "status" "PollsStatus" NOT NULL,

    CONSTRAINT "Polls_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PollOptions" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "voteCount" INTEGER NOT NULL DEFAULT 0,
    "pollsId" INTEGER NOT NULL,

    CONSTRAINT "PollOptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PollVotes" (
    "id" SERIAL NOT NULL,
    "usersId" INTEGER NOT NULL,
    "pollOptionsId" INTEGER NOT NULL,

    CONSTRAINT "PollVotes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Communities" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "Communities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommunityMembers" (
    "id" SERIAL NOT NULL,
    "role" "CommunityRole" NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "communitiesId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "CommunityMembers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reports" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT NOT NULL,
    "category" "ReportCategory" NOT NULL,
    "status" "ReportStatus" NOT NULL,
    "response" TEXT,
    "usersId" INTEGER NOT NULL,

    CONSTRAINT "Reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Submissions" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "category" "SubmissionCategory" NOT NULL,
    "status" "SubmissionStatus" NOT NULL,
    "description" TEXT NOT NULL,
    "usersId" INTEGER NOT NULL,

    CONSTRAINT "Submissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "News" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" TEXT NOT NULL,
    "reactionCount" INTEGER NOT NULL DEFAULT 0,
    "commentCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NewsComments" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "usersId" INTEGER NOT NULL,
    "newsId" INTEGER NOT NULL,

    CONSTRAINT "NewsComments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NewsReactions" (
    "id" SERIAL NOT NULL,
    "usersId" INTEGER NOT NULL,
    "newsId" INTEGER NOT NULL,

    CONSTRAINT "NewsReactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Villages" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,

    CONSTRAINT "Villages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Facilities" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "buildDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Facilities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Files" (
    "id" SERIAL NOT NULL,
    "urlFile" TEXT NOT NULL,
    "fileableId" INTEGER NOT NULL,
    "fileableType" "FileableType" NOT NULL,

    CONSTRAINT "Files_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Families_familyNumber_key" ON "Families"("familyNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PollVotes_usersId_pollOptionsId_key" ON "PollVotes"("usersId", "pollOptionsId");

-- CreateIndex
CREATE UNIQUE INDEX "CommunityMembers_userId_communitiesId_key" ON "CommunityMembers"("userId", "communitiesId");

-- CreateIndex
CREATE UNIQUE INDEX "NewsReactions_usersId_newsId_key" ON "NewsReactions"("usersId", "newsId");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_familiesId_fkey" FOREIGN KEY ("familiesId") REFERENCES "Families"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RewardLogs" ADD CONSTRAINT "RewardLogs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PollOptions" ADD CONSTRAINT "PollOptions_pollsId_fkey" FOREIGN KEY ("pollsId") REFERENCES "Polls"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PollVotes" ADD CONSTRAINT "PollVotes_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PollVotes" ADD CONSTRAINT "PollVotes_pollOptionsId_fkey" FOREIGN KEY ("pollOptionsId") REFERENCES "PollOptions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Communities" ADD CONSTRAINT "Communities_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunityMembers" ADD CONSTRAINT "CommunityMembers_communitiesId_fkey" FOREIGN KEY ("communitiesId") REFERENCES "Communities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunityMembers" ADD CONSTRAINT "CommunityMembers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reports" ADD CONSTRAINT "Reports_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submissions" ADD CONSTRAINT "Submissions_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewsComments" ADD CONSTRAINT "NewsComments_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewsComments" ADD CONSTRAINT "NewsComments_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "News"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewsReactions" ADD CONSTRAINT "NewsReactions_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewsReactions" ADD CONSTRAINT "NewsReactions_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "News"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
