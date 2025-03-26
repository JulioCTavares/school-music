import { pgTable, uuid } from "drizzle-orm/pg-core";
import { aluno } from "./aluno";
import { turma } from "./turma";

export const pertence = pgTable("pertence", {
  id: uuid("id").defaultRandom().primaryKey(),
  idTurma: uuid("id_turma").references(() => turma.id),
  idAluno: uuid("id_aluno").references(() => aluno.id),
});
