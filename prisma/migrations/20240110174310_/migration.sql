-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ruta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "origenId" INTEGER NOT NULL,
    "destinoId" INTEGER NOT NULL,
    "isValid" BOOLEAN NOT NULL,
    "rawData" TEXT,
    CONSTRAINT "Ruta_origenId_fkey" FOREIGN KEY ("origenId") REFERENCES "Estacion" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Ruta_destinoId_fkey" FOREIGN KEY ("destinoId") REFERENCES "Estacion" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Ruta" ("destinoId", "id", "isValid", "origenId", "rawData") SELECT "destinoId", "id", "isValid", "origenId", "rawData" FROM "Ruta";
DROP TABLE "Ruta";
ALTER TABLE "new_Ruta" RENAME TO "Ruta";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
