/*
  Warnings:

  - You are about to drop the column `task` on the `parts` table. All the data in the column will be lost.
  - You are about to drop the column `taskMd` on the `parts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "parts" DROP COLUMN "task",
DROP COLUMN "taskMd",
ADD COLUMN     "taskHtml" TEXT,
ADD COLUMN     "taskMarkdown" TEXT;
