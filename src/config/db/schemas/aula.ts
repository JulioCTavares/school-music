import { pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { turma } from "./turma";

export const aula = pgTable("aula", {
  id: uuid("id").defaultRandom().primaryKey(),
  horario: text("horario").notNull(),
  disciplina: text("disciplina").notNull(),
  cod_aula: varchar("cod_aula", { length: 255 }).notNull().unique(),
  nr_sala: text("nr_sala").notNull(),
  idTurma: uuid("id_turma").references(() => turma.id),
});
