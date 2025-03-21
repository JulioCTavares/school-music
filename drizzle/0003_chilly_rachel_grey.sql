CREATE TABLE "turma" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"turno" text NOT NULL,
	"cod_turma" varchar(255) NOT NULL,
	"nivel" varchar NOT NULL,
	CONSTRAINT "turma_cod_turma_unique" UNIQUE("cod_turma")
);
