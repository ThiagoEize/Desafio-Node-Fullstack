-- Drop existing foreign key constraint if any
ALTER TABLE "events" DROP CONSTRAINT IF EXISTS "events_placeId_fkey";

-- Add new columns as nullable
ALTER TABLE "events" ADD COLUMN "event" TEXT;
ALTER TABLE "events" ADD COLUMN "dateStart" TIMESTAMP;
ALTER TABLE "events" ADD COLUMN "hourStart" TEXT;
ALTER TABLE "events" ADD COLUMN "dateEnd" TIMESTAMP;
ALTER TABLE "events" ADD COLUMN "hourEnd" TEXT;

-- Update existing rows with default values
UPDATE "events" SET 
  "event" = 'default_event',
  "dateStart" = NOW(),
  "hourStart" = '00:00',
  "dateEnd" = NOW(),
  "hourEnd" = '00:00'
WHERE "event" IS NULL OR "dateStart" IS NULL OR "hourStart" IS NULL OR "dateEnd" IS NULL OR "hourEnd" IS NULL;

-- Alter columns to be not nullable
ALTER TABLE "events" ALTER COLUMN "event" SET NOT NULL;
ALTER TABLE "events" ALTER COLUMN "dateStart" SET NOT NULL;
ALTER TABLE "events" ALTER COLUMN "hourStart" SET NOT NULL;
ALTER TABLE "events" ALTER COLUMN "dateEnd" SET NOT NULL;
ALTER TABLE "events" ALTER COLUMN "hourEnd" SET NOT NULL;

-- Re-add foreign key constraint
ALTER TABLE "events" ADD CONSTRAINT "events_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "places"("id");
