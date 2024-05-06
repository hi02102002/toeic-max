ALTER TABLE "question_sections" DROP CONSTRAINT "question_sections_test_kit_id_test_kits_id_fk";
--> statement-breakpoint
ALTER TABLE "questions" DROP CONSTRAINT "questions_question_section_id_question_sections_id_fk";
--> statement-breakpoint
ALTER TABLE "test_kits" DROP CONSTRAINT "test_kits_kit_id_kits_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "question_sections" ADD CONSTRAINT "question_sections_test_kit_id_test_kits_id_fk" FOREIGN KEY ("test_kit_id") REFERENCES "test_kits"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "questions" ADD CONSTRAINT "questions_question_section_id_question_sections_id_fk" FOREIGN KEY ("question_section_id") REFERENCES "question_sections"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "test_kits" ADD CONSTRAINT "test_kits_kit_id_kits_id_fk" FOREIGN KEY ("kit_id") REFERENCES "kits"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
