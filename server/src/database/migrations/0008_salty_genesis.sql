CREATE TABLE IF NOT EXISTS "vocab_histories" (
	"id" varchar PRIMARY KEY NOT NULL,
	"user_id" varchar,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"topic_id" varchar,
	"list_vocab" json
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "vocab_histories" ADD CONSTRAINT "vocab_histories_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "vocab_histories" ADD CONSTRAINT "vocab_histories_topic_id_topics_id_fk" FOREIGN KEY ("topic_id") REFERENCES "public"."topics"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
