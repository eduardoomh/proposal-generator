-- CreateTable
CREATE TABLE "configurations" (
    "id" TEXT NOT NULL,
    "sellers" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "configurations_pkey" PRIMARY KEY ("id")
);
