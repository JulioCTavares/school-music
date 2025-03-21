import { integer, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const aluno = pgTable("aluno", {
  id: uuid("id").defaultRandom().primaryKey(),
  nome: varchar("nome", { length: 100 }).notNull(),
  idade: integer("idade").notNull(),
  matricula: varchar("matricula", { length: 20 }).notNull().unique(),
  cpf: varchar("cpf", { length: 14 }).notNull().unique(),
  idAluno: varchar("id_aluno", { length: 20 }).notNull().unique(),
});
