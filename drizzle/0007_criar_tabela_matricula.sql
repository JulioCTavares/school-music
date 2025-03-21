CREATE TABLE "matricula" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"cod_matricula" varchar(255) NOT NULL,
	"id_aluno" uuid,
	"id_aula" uuid,
	CONSTRAINT "matricula_cod_matricula_unique" UNIQUE("cod_matricula")
);
--> statement-breakpoint
ALTER TABLE "matricula" ADD CONSTRAINT "matricula_id_aluno_aluno_id_fk" FOREIGN KEY ("id_aluno") REFERENCES "public"."aluno"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "matricula" ADD CONSTRAINT "matricula_id_aula_aula_id_fk" FOREIGN KEY ("id_aula") REFERENCES "public"."aula"("id") ON DELETE no action ON UPDATE no action;