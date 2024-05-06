ALTER TABLE "vocabularies" DROP CONSTRAINT "vocabularies_name_unique";--> statement-breakpoint
ALTER TABLE "topics" DROP CONSTRAINT "topics_parent_id_topics_id_fk";
--> statement-breakpoint
ALTER TABLE "topics" ALTER COLUMN "level" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "topics" ALTER COLUMN "slug" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "vocabularies" ALTER COLUMN "name" DROP NOT NULL;