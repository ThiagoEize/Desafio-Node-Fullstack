/*
  Warnings:

  - You are about to drop the column `date` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `evento` on the `events` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_placeId_fkey";

-- AlterTable
ALTER TABLE "events" DROP COLUMN "date",
DROP COLUMN "evento",
ALTER COLUMN "dateStart" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "dateEnd" SET DATA TYPE TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "places"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
