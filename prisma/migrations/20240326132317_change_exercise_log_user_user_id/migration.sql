/*
  Warnings:

  - Made the column `user_id` on table `Exercise_logs` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Exercise_logs" DROP CONSTRAINT "Exercise_logs_user_id_fkey";

-- AlterTable
ALTER TABLE "Exercise_logs" ALTER COLUMN "user_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Exercise_logs" ADD CONSTRAINT "Exercise_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
