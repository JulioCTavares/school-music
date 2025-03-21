import { eq } from "drizzle-orm";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import type { Toca, TocaInsert } from "..";
import type { TocaRepository } from "../../../repository/toca";
import { toca } from "../schemas/toca";

export class DrizzleTocaRepository implements TocaRepository {
  constructor(private db: PostgresJsDatabase) {}

  async findAll(): Promise<Toca[]> {
    return this.db.select().from(toca);
  }

  async findById(id: string): Promise<Toca | null> {
    const results = await this.db.select().from(toca).where(eq(toca.id, id));
    return results[0] ?? null;
  }

  async findByAluno(matricula: string): Promise<Toca[]> {
    return this.db.select().from(toca).where(eq(toca.idAluno, matricula));
  }

  async findByInstrumento(nSerie: string): Promise<Toca[]> {
    return this.db.select().from(toca).where(eq(toca.idInstrumento, nSerie));
  }

  async create(data: TocaInsert): Promise<Toca> {
    const results = await this.db.insert(toca).values(data).returning();

    if (!results[0]) {
      throw new Error("Erro ao criar toca, nenhum registro retornado.");
    }

    return results[0];
  }

  async update(id: string, data: Partial<TocaInsert>): Promise<Toca> {
    const results = await this.db
      .update(toca)
      .set(data)
      .where(eq(toca.id, id))
      .returning();

    if (!results[0]) {
      throw new Error("Erro ao atualizar toca, nenhum registro retornado.");
    }

    return results[0];
  }

  async delete(id: string): Promise<boolean> {
    const results = await this.db
      .delete(toca)
      .where(eq(toca.id, id))
      .returning();
    return results.length > 0;
  }
}
