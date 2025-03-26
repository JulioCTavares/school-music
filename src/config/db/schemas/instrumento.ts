import { pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";

export const instrumento = pgTable("instrumento", {
  id: uuid("id").defaultRandom().primaryKey(),
  n_serie: varchar("n_serie", { length: 255 }).notNull().unique(),
  tipo: text("tipo").notNull(),
});
