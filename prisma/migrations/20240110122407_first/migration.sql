-- CreateTable
CREATE TABLE "Estacion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Ruta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "origenId" INTEGER NOT NULL,
    "destinoId" INTEGER NOT NULL,
    "isValid" BOOLEAN NOT NULL,
    "rawData" TEXT NOT NULL,
    CONSTRAINT "Ruta_origenId_fkey" FOREIGN KEY ("origenId") REFERENCES "Estacion" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Ruta_destinoId_fkey" FOREIGN KEY ("destinoId") REFERENCES "Estacion" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
