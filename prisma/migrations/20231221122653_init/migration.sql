-- AlterEnum
ALTER TYPE "LessonContentType" ADD VALUE 'typescript';

-- AlterTable
ALTER TABLE "lessons" ADD COLUMN     "readyToPublish" BOOLEAN NOT NULL DEFAULT false;
