CREATE TABLE "pertence" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"id_turma" uuid,
	"id_aluno" uuid
);
--> statement-breakpoint
ALTER TABLE "pertence" ADD CONSTRAINT "pertence_id_turma_turma_id_fk" FOREIGN KEY ("id_turma") REFERENCES "public"."turma"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pertence" ADD CONSTRAINT "pertence_id_aluno_aluno_id_fk" FOREIGN KEY ("id_aluno") REFERENCES "public"."aluno"("id") ON DELETE no action ON UPDATE no action;