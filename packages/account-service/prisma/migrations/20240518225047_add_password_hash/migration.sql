-- AlterTable
ALTER TABLE "users" ADD COLUMN     "passwordHash" TEXT,
ALTER COLUMN "salt" DROP NOT NULL;
