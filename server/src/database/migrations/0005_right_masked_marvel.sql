ALTER TABLE "vocabularies" ADD CONSTRAINT "vocabularies_unique" UNIQUE("name","topic_id");