/*
  Warnings:

  - You are about to drop the column `msg` on the `SysUserLog` table. All the data in the column will be lost.
  - Added the required column `message` to the `SysUserLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SysUserLog" DROP COLUMN "msg",
ADD COLUMN     "message" TEXT NOT NULL,
ALTER COLUMN "category" SET DEFAULT E'default',
ALTER COLUMN "level" SET DEFAULT E'info',
ALTER COLUMN "level" SET DATA TYPE TEXT;
