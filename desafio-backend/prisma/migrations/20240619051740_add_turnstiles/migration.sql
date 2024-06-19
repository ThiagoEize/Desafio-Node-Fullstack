-- CreateTable
CREATE TABLE "turnstiles" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "placeId" INTEGER NOT NULL,

    CONSTRAINT "turnstiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "turnstiles_placeId_idx" ON "turnstiles"("placeId");

-- AddForeignKey
ALTER TABLE "turnstiles" ADD CONSTRAINT "turnstiles_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "places"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
