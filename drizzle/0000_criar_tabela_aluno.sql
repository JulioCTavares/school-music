CREATE TABLE "aluno" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nome" varchar(100) NOT NULL,
	"idade" integer NOT NULL,
	"matricula" varchar(20) NOT NULL,
	"cpf" varchar(14) NOT NULL,
	"id_aluno" varchar(20) NOT NULL,
	CONSTRAINT "aluno_matricula_unique" UNIQUE("matricula"),
	CONSTRAINT "aluno_cpf_unique" UNIQUE("cpf"),
	CONSTRAINT "aluno_id_aluno_unique" UNIQUE("id_aluno")
);
