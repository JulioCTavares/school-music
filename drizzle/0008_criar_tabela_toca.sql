CREATE TABLE "toca" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"id_aluno" uuid,
	"id_instrumento" uuid
);
--> statement-breakpoint
ALTER TABLE "toca" ADD CONSTRAINT "toca_id_aluno_aluno_id_fk" FOREIGN KEY ("id_aluno") REFERENCES "public"."aluno"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "toca" ADD CONSTRAINT "toca_id_instrumento_instrumento_id_fk" FOREIGN KEY ("id_instrumento") REFERENCES "public"."instrumento"("id") ON DELETE no action ON UPDATE no action;