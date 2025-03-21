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
--> statement-breakpoint
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
CREATE TABLE "instrumento" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"n_serie" varchar(255) NOT NULL,
	"tipo" text NOT NULL,
	CONSTRAINT "instrumento_n_serie_unique" UNIQUE("n_serie")
);
--> statement-breakpoint
CREATE TABLE "matricula" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"cod_matricula" varchar(255) NOT NULL,
	"id_aluno" uuid,
	"id_aula" uuid,
	CONSTRAINT "matricula_cod_matricula_unique" UNIQUE("cod_matricula")
);
--> statement-breakpoint
CREATE TABLE "pertence" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"id_turma" uuid,
	"id_aluno" uuid
);
--> statement-breakpoint
CREATE TABLE "professor" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nome_prof" varchar NOT NULL,
	"especialidade" varchar NOT NULL,
	"chave" varchar(255) NOT NULL,
	"id_aula" uuid,
	CONSTRAINT "professor_chave_unique" UNIQUE("chave")
);
--> statement-breakpoint
CREATE TABLE "toca" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"id_aluno" uuid,
	"id_instrumento" uuid
);
--> statement-breakpoint
CREATE TABLE "turma" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"turno" text NOT NULL,
	"cod_turma" varchar(255) NOT NULL,
	"nivel" varchar NOT NULL,
	CONSTRAINT "turma_cod_turma_unique" UNIQUE("cod_turma")
);
--> statement-breakpoint
CREATE TABLE "utiliza" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"id_aula" uuid,
	"id_instrumento" uuid
);
--> statement-breakpoint
ALTER TABLE "aula" ADD CONSTRAINT "aula_id_turma_turma_id_fk" FOREIGN KEY ("id_turma") REFERENCES "public"."turma"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "matricula" ADD CONSTRAINT "matricula_id_aluno_aluno_id_fk" FOREIGN KEY ("id_aluno") REFERENCES "public"."aluno"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "matricula" ADD CONSTRAINT "matricula_id_aula_aula_id_fk" FOREIGN KEY ("id_aula") REFERENCES "public"."aula"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pertence" ADD CONSTRAINT "pertence_id_turma_turma_id_fk" FOREIGN KEY ("id_turma") REFERENCES "public"."turma"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pertence" ADD CONSTRAINT "pertence_id_aluno_aluno_id_fk" FOREIGN KEY ("id_aluno") REFERENCES "public"."aluno"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "professor" ADD CONSTRAINT "professor_id_aula_aula_id_fk" FOREIGN KEY ("id_aula") REFERENCES "public"."aula"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "toca" ADD CONSTRAINT "toca_id_aluno_aluno_id_fk" FOREIGN KEY ("id_aluno") REFERENCES "public"."aluno"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "toca" ADD CONSTRAINT "toca_id_instrumento_instrumento_id_fk" FOREIGN KEY ("id_instrumento") REFERENCES "public"."instrumento"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "utiliza" ADD CONSTRAINT "utiliza_id_aula_aula_id_fk" FOREIGN KEY ("id_aula") REFERENCES "public"."aula"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "utiliza" ADD CONSTRAINT "utiliza_id_instrumento_instrumento_id_fk" FOREIGN KEY ("id_instrumento") REFERENCES "public"."instrumento"("id") ON DELETE no action ON UPDATE no action;