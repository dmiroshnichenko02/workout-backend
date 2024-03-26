-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "exercise_log_id" INTEGER;

-- CreateTable
CREATE TABLE "Exercise_logs" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_completed" BOOLEAN NOT NULL DEFAULT false,
    "user_id" INTEGER,
    "workoutLogId" INTEGER,

    CONSTRAINT "Exercise_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exercise_time" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "weight" INTEGER NOT NULL,
    "repeat" INTEGER NOT NULL,
    "is_completed" BOOLEAN NOT NULL DEFAULT false,
    "exercise_log_id" INTEGER,

    CONSTRAINT "Exercise_time_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Workout_logs" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_complete" BOOLEAN NOT NULL DEFAULT false,
    "user_id" INTEGER,
    "workout_id" INTEGER,

    CONSTRAINT "Workout_logs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_exercise_log_id_fkey" FOREIGN KEY ("exercise_log_id") REFERENCES "Exercise_logs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercise_logs" ADD CONSTRAINT "Exercise_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercise_logs" ADD CONSTRAINT "Exercise_logs_workoutLogId_fkey" FOREIGN KEY ("workoutLogId") REFERENCES "Workout_logs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercise_time" ADD CONSTRAINT "Exercise_time_exercise_log_id_fkey" FOREIGN KEY ("exercise_log_id") REFERENCES "Exercise_logs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workout_logs" ADD CONSTRAINT "Workout_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workout_logs" ADD CONSTRAINT "Workout_logs_workout_id_fkey" FOREIGN KEY ("workout_id") REFERENCES "Workout"("id") ON DELETE SET NULL ON UPDATE CASCADE;
