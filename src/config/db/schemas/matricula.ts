import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { aluno } from "./aluno";
import { aula } from "./aula";

export const se_matricula = pgTable("matricula", {
  id: uuid("id").defaultRandom().primaryKey(),
  cod_matricula: varchar("cod_matricula", { length: 255 }).notNull().unique(),
  idAluno: uuid("id_aluno").references(() => aluno.id),
  idAula: uuid("id_aula").references(() => aula.id),
});
