import { eq } from "drizzle-orm";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import type { Instrumento, InstrumentoInsert } from "..";
import type { InstrumentoRepository } from "../../../repository/instrumento";
import { instrumento } from "../schemas/instrumento";

export class DrizzleInstrumentoRepository implements InstrumentoRepository {
  constructor(private db: PostgresJsDatabase) {}

  async findAll(): Promise<Instrumento[]> {
    return this.db.select().from(instrumento);
  }

  async findById(id: string): Promise<Instrumento | null> {
    const results = await this.db
      .select()
      .from(instrumento)
      .where(eq(instrumento.id, id));
    return results[0] ?? null;
  }

  async findByNSerie(nSerie: string): Promise<Instrumento | null> {
    const results = await this.db
      .select()
      .from(instrumento)
      .where(eq(instrumento.n_serie, nSerie));
    return results[0] ?? null;
  }

  async findByTipo(tipo: string): Promise<Instrumento[]> {
    return this.db.select().from(instrumento).where(eq(instrumento.tipo, tipo));
  }

  async create(data: InstrumentoInsert): Promise<Instrumento> {
    const results = await this.db.insert(instrumento).values(data).returning();

    if (!results[0]) {
      throw new Error("Erro ao criar instrumento, nenhum registro retornado.");
    }

    return results[0];
  }

  async update(
    id: string,
    data: Partial<InstrumentoInsert>
  ): Promise<Instrumento> {
    const results = await this.db
      .update(instrumento)
      .set(data)
      .where(eq(instrumento.id, id))
      .returning();

    if (!results[0]) {
      throw new Error(
        "Erro ao atualizar instrumento, nenhum registro retornado."
      );
    }

    return results[0];
  }

  async delete(id: string): Promise<boolean> {
    const results = await this.db
      .delete(instrumento)
      .where(eq(instrumento.id, id))
      .returning();
    return results.length > 0;
  }
}
