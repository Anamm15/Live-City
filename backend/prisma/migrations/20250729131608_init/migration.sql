/*
  Warnings:

  - The values [CIVIL_SERVANT,MILITARY,POLICE,PRIVATE_EMPLOYEE] on the enum `Occupation` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Occupation_new" AS ENUM ('EMPLOYED', 'STUDENT', 'RETIRED', 'ENTREPRENEUR', 'UNEMPLOYED', 'OTHER');
ALTER TABLE "Users" ALTER COLUMN "job" TYPE "Occupation_new" USING ("job"::text::"Occupation_new");
ALTER TYPE "Occupation" RENAME TO "Occupation_old";
ALTER TYPE "Occupation_new" RENAME TO "Occupation";
DROP TYPE "Occupation_old";
COMMIT;
