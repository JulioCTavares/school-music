import { eq } from "drizzle-orm";
import { db, type Utiliza, type UtilizaInsert } from "..";
import type { UtilizaRepository } from "../../../repository/utiliza";
import { utiliza } from "../schemas/utiliza";

export class DrizzleUtilizaRepository implements UtilizaRepository {
  constructor() {}

  async findAll(): Promise<Utiliza[]> {
    return db.select().from(utiliza);
  }

  async findById(id: string): Promise<Utiliza | null> {
    const results = await db.select().from(utiliza).where(eq(utiliza.id, id));
    return results[0] ?? null;
  }

  async findByAula(idAula: string): Promise<Utiliza[]> {
    return db.select().from(utiliza).where(eq(utiliza.idAula, idAula));
  }

  async findByInstrumento(nSerie: string): Promise<Utiliza[]> {
    return db.select().from(utiliza).where(eq(utiliza.idInstrumento, nSerie));
  }

  async create(data: UtilizaInsert): Promise<Utiliza> {
    const results = await db.insert(utiliza).values(data).returning();

    if (!results[0]) {
      throw new Error("Erro ao criar utiliza, nenhum registro retornado.");
    }

    return results[0];
  }

  async update(id: string, data: Partial<UtilizaInsert>): Promise<Utiliza> {
    const results = await db
      .update(utiliza)
      .set(data)
      .where(eq(utiliza.id, id))
      .returning();

    if (!results[0]) {
      throw new Error("Erro ao atualizar utiliza, nenhum registro retornado.");
    }

    return results[0];
  }

  async delete(id: string): Promise<boolean> {
    const results = await db
      .delete(utiliza)
      .where(eq(utiliza.id, id))
      .returning();
    return results.length > 0;
  }
}
