-- CreateTable
CREATE TABLE "SysUser" (
"id" SERIAL,
    "uid" TEXT NOT NULL,
    "avatar" TEXT,
    "nickname" TEXT,
    "gender" INTEGER NOT NULL DEFAULT 0,
    "username" TEXT,
    "password" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "mobile" TEXT,
    "email" TEXT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "isLocked" BOOLEAN NOT NULL DEFAULT false,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SysUserLog" (
"id" SERIAL,
    "category" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "action" TEXT NOT NULL,
    "msg" TEXT NOT NULL,
    "details" TEXT,
    "userAgent" TEXT NOT NULL,
    "clientIp" TEXT NOT NULL,
    "createdBy" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sysUserId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SysUser.uid_unique" ON "SysUser"("uid");

-- AddForeignKey
ALTER TABLE "SysUserLog" ADD FOREIGN KEY("sysUserId")REFERENCES "SysUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
