CREATE TABLE IF NOT EXISTS "histories" (
	"id" varchar PRIMARY KEY NOT NULL,
	"user_id" varchar,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"meta_data" json,
	"contents" json,
	"type" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "histories" ADD CONSTRAINT "histories_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
