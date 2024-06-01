DO $$ BEGIN
 CREATE TYPE "public"."roles" AS ENUM('ADMIN', 'USER');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "course_topics" (
	"id" varchar PRIMARY KEY NOT NULL,
	"course_id" varchar,
	"name" text,
	"slug" text,
	"parent_id" varchar,
	"introduction" text,
	CONSTRAINT "course_topics_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "courses" (
	"id" varchar PRIMARY KEY NOT NULL,
	"cover_url" text,
	"description" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"slug" text,
	"teaser" text,
	"price" real DEFAULT 0,
	"old_price" real DEFAULT 0,
	CONSTRAINT "courses_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "kits" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"year" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "kits_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "question_sections" (
	"id" varchar PRIMARY KEY NOT NULL,
	"test_kit_id" varchar,
	"part" integer,
	"image_urls" json,
	"audio_url" text,
	"teaser" json,
	"location" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "questions" (
	"id" varchar PRIMARY KEY NOT NULL,
	"opts" json,
	"ans" text,
	"tran" json,
	"p" integer NOT NULL,
	"location" integer NOT NULL,
	"question_section_id" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sections" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"title" text,
	"title_vi" text,
	"intro" text,
	"intro_vi" text,
	"intro_audio" text,
	"intro_image" text,
	"intro_answer" text,
	"section_title" text,
	"section_description" text,
	CONSTRAINT "sections_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "test_kits" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"year" integer NOT NULL,
	"slug" text NOT NULL,
	"kit_id" varchar,
	"type" text DEFAULT 'toeic',
	CONSTRAINT "test_kits_name_unique" UNIQUE("name"),
	CONSTRAINT "test_kits_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "topics" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"parent_id" varchar,
	"level" integer,
	"slug" text,
	CONSTRAINT "topics_name_unique" UNIQUE("name"),
	CONSTRAINT "topics_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" varchar PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"password" text,
	"name" text NOT NULL,
	"avatar" text,
	"role" roles[] NOT NULL,
	"provider" text DEFAULT 'local' NOT NULL,
	"is_verified" boolean DEFAULT true,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "vocabularies" (
	"id" varchar PRIMARY KEY NOT NULL,
	"example" text,
	"image" text,
	"name" text,
	"spelling" text,
	"type" text,
	"meaning" text,
	"topic_id" varchar,
	"category" text,
	CONSTRAINT "vocabularies_unique" UNIQUE("name","topic_id","example")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "course_topics" ADD CONSTRAINT "course_topics_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "question_sections" ADD CONSTRAINT "question_sections_test_kit_id_test_kits_id_fk" FOREIGN KEY ("test_kit_id") REFERENCES "public"."test_kits"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "questions" ADD CONSTRAINT "questions_question_section_id_question_sections_id_fk" FOREIGN KEY ("question_section_id") REFERENCES "public"."question_sections"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "test_kits" ADD CONSTRAINT "test_kits_kit_id_kits_id_fk" FOREIGN KEY ("kit_id") REFERENCES "public"."kits"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "vocabularies" ADD CONSTRAINT "vocabularies_topic_id_topics_id_fk" FOREIGN KEY ("topic_id") REFERENCES "public"."topics"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "email_idx" ON "users" ("email");