-- CreateEnum
CREATE TYPE "paidStatus" AS ENUM ('YES', 'NO');

-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "paid" "paidStatus" NOT NULL DEFAULT 'NO';
