import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { aula } from "./aula";

export const professor = pgTable("professor", {
  id: uuid("id").defaultRandom().primaryKey(),
  nome_prof: varchar("nome_prof").notNull(),
  especialidade: varchar("especialidade").notNull(),
  chave: varchar("chave", { length: 255 }).notNull().unique(),
  idAula: uuid("id_aula").references(() => aula.id),
});
