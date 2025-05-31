-- CreateEnum
CREATE TYPE "Language" AS ENUM ('en', 'es');

-- CreateTable
CREATE TABLE "proposals" (
    "id" TEXT NOT NULL,
    "choose_person" TEXT,
    "prepared_by" TEXT NOT NULL,
    "presented_to_name" TEXT NOT NULL,
    "company_name" TEXT NOT NULL,
    "email_address" TEXT NOT NULL,
    "initial_invoice_amount" DOUBLE PRECISION NOT NULL,
    "minimum_retainer_amount" DOUBLE PRECISION NOT NULL,
    "estimated_cost" DOUBLE PRECISION NOT NULL,
    "estimated_hours" DOUBLE PRECISION NOT NULL,
    "engineering_rate" DOUBLE PRECISION NOT NULL,
    "engineering_percentage" INTEGER NOT NULL,
    "architecture_rate" DOUBLE PRECISION NOT NULL,
    "architecture_percentage" INTEGER NOT NULL,
    "sr_architecture_rate" DOUBLE PRECISION NOT NULL,
    "sr_architecture_percentage" INTEGER NOT NULL,
    "language" "Language" NOT NULL,
    "description" TEXT NOT NULL,
    "deliverables" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "proposals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "templates" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "initial_invoice_amount" DOUBLE PRECISION NOT NULL,
    "minimum_retainer_amount" DOUBLE PRECISION NOT NULL,
    "estimated_cost" DOUBLE PRECISION NOT NULL,
    "estimated_hours" DOUBLE PRECISION NOT NULL,
    "engineering_rate" DOUBLE PRECISION NOT NULL,
    "engineering_percentage" DOUBLE PRECISION NOT NULL,
    "architecture_rate" DOUBLE PRECISION NOT NULL,
    "architecture_percentage" DOUBLE PRECISION NOT NULL,
    "sr_architecture_rate" DOUBLE PRECISION NOT NULL,
    "sr_architecture_percentage" DOUBLE PRECISION NOT NULL,
    "language" "Language" NOT NULL,
    "description" TEXT NOT NULL,
    "deliverables" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pdf_content" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "language" "Language" NOT NULL,
    "general_text_1" TEXT NOT NULL,
    "who_will_work_text_1" TEXT NOT NULL,
    "how_we_get_started_text_1" TEXT NOT NULL,
    "how_you_are_billed_text_1" TEXT NOT NULL,
    "how_you_are_billed_text_2" TEXT NOT NULL,
    "how_you_are_billed_alert" TEXT NOT NULL,
    "how_we_keep_going_text_1" TEXT NOT NULL,
    "how_we_keep_going_alert" TEXT NOT NULL,
    "availability_and_sla_text_1" TEXT NOT NULL,
    "estimates_text_1" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pdf_content_pkey" PRIMARY KEY ("id")
);
