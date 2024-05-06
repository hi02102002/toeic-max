ALTER TABLE "vocabularies" DROP CONSTRAINT "vocabularies_unique";--> statement-breakpoint
ALTER TABLE "vocabularies" ADD CONSTRAINT "vocabularies_unique" UNIQUE("name","topic_id","example");