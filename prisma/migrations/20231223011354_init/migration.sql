/*
  Warnings:

  - The primary key for the `accounts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `_id` on the `accounts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_pkey",
DROP COLUMN "_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "accounts_pkey" PRIMARY KEY ("id");
