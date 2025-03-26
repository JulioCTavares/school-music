import { pgTable, uuid } from "drizzle-orm/pg-core";
import { aluno } from "./aluno";
import { instrumento } from "./instrumento";

export const toca = pgTable("toca", {
  id: uuid("id").defaultRandom().primaryKey(),
  idAluno: uuid("id_aluno").references(() => aluno.id),
  idInstrumento: uuid("id_instrumento").references(() => instrumento.id),
});
