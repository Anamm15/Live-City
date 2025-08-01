/*
  Warnings:

  - You are about to drop the column `description` on the `Villages` table. All the data in the column will be lost.
  - Added the required column `latitude` to the `Villages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Villages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Villages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Villages" DROP COLUMN "description",
ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;
