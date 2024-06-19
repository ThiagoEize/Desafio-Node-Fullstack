/*
  Warnings:

  - You are about to drop the column `hourEnd` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `hourStart` on the `events` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "events" DROP COLUMN "hourEnd",
DROP COLUMN "hourStart";
