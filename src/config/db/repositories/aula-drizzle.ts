import { eq } from "drizzle-orm";
import { db, type Aula, type AulaInsert } from "..";
import type { AulaRepository } from "../../../repository/aula";
import { aula } from "../schemas/aula";

export class DrizzleAulaRepository implements AulaRepository {
  constructor() {}

  async findAll(): Promise<Aula[]> {
    return db.select().from(aula);
  }

  async findById(id: string): Promise<Aula | null> {
    const results = await db.select().from(aula).where(eq(aula.id, id));
    return results[0] ?? null;
  }

  async findByCodAula(codAula: string): Promise<Aula | null> {
    const results = await db
      .select()
      .from(aula)
      .where(eq(aula.cod_aula, codAula));
    return results[0] ?? null;
  }

  async findByDisciplina(disciplina: string): Promise<Aula[]> {
    return db.select().from(aula).where(eq(aula.disciplina, disciplina));
  }

  async findByTurma(idTurma: string): Promise<Aula[]> {
    return db.select().from(aula).where(eq(aula.idTurma, idTurma));
  }

  async create(data: AulaInsert): Promise<Aula> {
    const results = await db.insert(aula).values(data).returning();

    if (!results[0]) {
      throw new Error("Erro ao criar aula, nenhum registro retornado.");
    }

    return results[0];
  }

  async update(id: string, data: Partial<AulaInsert>): Promise<Aula> {
    const results = await db
      .update(aula)
      .set(data)
      .where(eq(aula.id, id))
      .returning();

    if (!results[0]) {
      throw new Error("Erro ao atualizar aula, nenhum registro retornado.");
    }

    return results[0];
  }

  async delete(id: string): Promise<boolean> {
    const results = await db.delete(aula).where(eq(aula.id, id)).returning();
    return results.length > 0;
  }
}
