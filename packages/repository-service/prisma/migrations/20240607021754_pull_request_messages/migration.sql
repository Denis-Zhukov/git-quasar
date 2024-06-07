/*
  Warnings:

  - Added the required column `user_id` to the `pull_request_messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `pull_requests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `pull_requests` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "pull_requests" DROP CONSTRAINT "pull_requests_repository_id_fkey";

-- AlterTable
ALTER TABLE "pull_request_messages" ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "pull_requests" ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "title" TEXT NOT NULL,
ALTER COLUMN "merged" SET DEFAULT false;

-- AddForeignKey
ALTER TABLE "pull_requests" ADD CONSTRAINT "pull_requests_repository_id_fkey" FOREIGN KEY ("repository_id") REFERENCES "repositories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
