/*
  Warnings:

  - You are about to drop the column `closed` on the `pull_requests` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "pull_requests" DROP COLUMN "closed",
ADD COLUMN     "merged" BOOLEAN NOT NULL DEFAULT true;
