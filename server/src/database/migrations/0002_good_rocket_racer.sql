DROP INDEX IF EXISTS "email_idx";--> statement-breakpoint
ALTER TABLE "questions" ADD COLUMN "q" text;