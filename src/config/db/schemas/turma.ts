import { pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";

export const turma = pgTable("turma", {
  id: uuid("id").defaultRandom().primaryKey(),
  turno: text("turno", { enum: ["manha", "tarde", "noite"] }).notNull(),
  cod_turma: varchar("cod_turma", { length: 255 }).notNull().unique(),
  nivel: varchar("nivel", {
    enum: ["iniciante", "intermediario", "avancado"],
  }).notNull(),
});
