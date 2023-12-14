-- CreateEnum
CREATE TYPE "LessonContentType" AS ENUM ('html', 'css', 'javascript', 'reactjs', 'reactts', 'angular');

-- CreateEnum
CREATE TYPE "AccessType" AS ENUM ('free', 'paid');

-- CreateTable
CREATE TABLE "lessons" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "contentType" "LessonContentType" NOT NULL,
    "accessType" "AccessType" NOT NULL DEFAULT 'free',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lessons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parts" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "task" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "lessonId" INTEGER,

    CONSTRAINT "parts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "parts" ADD CONSTRAINT "parts_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "lessons"("id") ON DELETE SET NULL ON UPDATE CASCADE;
