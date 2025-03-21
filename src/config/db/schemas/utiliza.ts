import { pgTable, uuid } from "drizzle-orm/pg-core";
import { aula } from "./aula";
import { instrumento } from "./instrumento";

export const utiliza = pgTable("utiliza", {
  id: uuid("id").defaultRandom().primaryKey(),
  idAula: uuid("id_aula").references(() => aula.id),
  idInstrumento: uuid("id_instrumento").references(() => instrumento.id),
});
