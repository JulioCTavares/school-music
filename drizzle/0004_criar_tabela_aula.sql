CREATE TABLE "aula" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"horario" text NOT NULL,
	"disciplina" text NOT NULL,
	"cod_aula" varchar(255) NOT NULL,
	"nr_sala" text NOT NULL,
	"id_turma" uuid,
	CONSTRAINT "aula_cod_aula_unique" UNIQUE("cod_aula")
);
--> statement-breakpoint
ALTER TABLE "professor" ADD COLUMN "id_aula" uuid;--> statement-breakpoint
ALTER TABLE "aula" ADD CONSTRAINT "aula_id_turma_turma_id_fk" FOREIGN KEY ("id_turma") REFERENCES "public"."turma"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "professor" ADD CONSTRAINT "professor_id_aula_aula_id_fk" FOREIGN KEY ("id_aula") REFERENCES "public"."aula"("id") ON DELETE no action ON UPDATE no action;