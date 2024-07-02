CREATE TABLE IF NOT EXISTS "listening" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" text,
	"duration" integer,
	"duration_text" text,
	"audio_url" text,
	"image_url" text,
	"transcript" json,
	"meta_data" json,
	"total_question" integer
);
