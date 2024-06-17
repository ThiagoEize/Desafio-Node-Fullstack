/*
  Warnings:

  - You are about to drop the column `place_id` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `gates` on the `places` table. All the data in the column will be lost.
  - Added the required column `placeId` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_place_id_fkey";

-- DropIndex
DROP INDEX "events_place_id_idx";

-- AlterTable
ALTER TABLE "events" DROP COLUMN "place_id",
ADD COLUMN     "placeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "places" DROP COLUMN "gates";

-- CreateTable
CREATE TABLE "gates" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "placeId" INTEGER NOT NULL,

    CONSTRAINT "gates_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "gates_placeId_idx" ON "gates"("placeId");

-- CreateIndex
CREATE INDEX "events_placeId_idx" ON "events"("placeId");

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "places"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gates" ADD CONSTRAINT "gates_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "places"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
