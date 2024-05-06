CREATE TABLE IF NOT EXISTS "topics" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"parent_id" varchar,
	"level" integer NOT NULL,
	"slug" text NOT NULL,
	CONSTRAINT "topics_name_unique" UNIQUE("name"),
	CONSTRAINT "topics_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "vocabularies" (
	"id" varchar PRIMARY KEY NOT NULL,
	"example" text,
	"image" text,
	"name" text NOT NULL,
	"spelling" text,
	"type" text,
	"meaning" text,
	"topic_id" varchar,
	"category" text,
	CONSTRAINT "vocabularies_name_unique" UNIQUE("name")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "topics" ADD CONSTRAINT "topics_parent_id_topics_id_fk" FOREIGN KEY ("parent_id") REFERENCES "topics"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "vocabularies" ADD CONSTRAINT "vocabularies_topic_id_topics_id_fk" FOREIGN KEY ("topic_id") REFERENCES "topics"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
