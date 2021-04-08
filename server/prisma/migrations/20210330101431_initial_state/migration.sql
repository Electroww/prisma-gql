/*
  Warnings:

  - Made the column `name` on table `Craft` required. The migration will fail if there are existing NULL values in that column.
  - Made the column `level` on table `Craft` required. The migration will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Item` required. The migration will fail if there are existing NULL values in that column.
  - Made the column `rarity` on table `Item` required. The migration will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Ressources` required. The migration will fail if there are existing NULL values in that column.
  - Made the column `rarity` on table `Ressources` required. The migration will fail if there are existing NULL values in that column.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `username` on table `User` required. The migration will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Craft" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,
    FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Craft" ("id", "name", "level", "itemId") SELECT "id", "name", "level", "itemId" FROM "Craft";
DROP TABLE "Craft";
ALTER TABLE "new_Craft" RENAME TO "Craft";
CREATE UNIQUE INDEX "Craft.itemId_unique" ON "Craft"("itemId");
CREATE TABLE "new_Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "rarity" INTEGER NOT NULL
);
INSERT INTO "new_Item" ("id", "name", "rarity") SELECT "id", "name", "rarity" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
CREATE TABLE "new_Profile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "bio" TEXT,
    "title" TEXT,
    "userId" INTEGER NOT NULL,
    FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Profile" ("id", "bio", "title", "userId") SELECT "id", "bio", "title", "userId" FROM "Profile";
DROP TABLE "Profile";
ALTER TABLE "new_Profile" RENAME TO "Profile";
CREATE UNIQUE INDEX "Profile.userId_unique" ON "Profile"("userId");
CREATE TABLE "new_Ressources" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "rarity" INTEGER NOT NULL
);
INSERT INTO "new_Ressources" ("id", "name", "rarity") SELECT "id", "name", "rarity" FROM "Ressources";
DROP TABLE "Ressources";
ALTER TABLE "new_Ressources" RENAME TO "Ressources";
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL
);
INSERT INTO "new_User" ("id", "email", "username") SELECT "id", "email", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
