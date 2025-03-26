import { eq } from "drizzle-orm";
import { db, type Turma, type TurmaInsert } from "..";
import type { TurmaNivelEnum } from "../../../enums/turmaEnum";
import type { TurmaRepository } from "../../../repository/turma";
import { turma } from "../schemas/turma";

export class DrizzleTurmaRepository implements TurmaRepository {
  constructor() {}

  async findAll(): Promise<Turma[]> {
    return db.select().from(turma);
  }

  async findById(id: string): Promise<Turma | null> {
    const results = await db.select().from(turma).where(eq(turma.id, id));
    return results[0] ?? null;
  }

  async findByCodTurma(codTurma: string): Promise<Turma | null> {
    const results = await db
      .select()
      .from(turma)
      .where(eq(turma.cod_turma, codTurma));
    return results[0] ?? null;
  }

  async findByNivel(nivel: string): Promise<Turma[]> {
    return db
      .select()
      .from(turma)
      .where(eq(turma.nivel, nivel as TurmaNivelEnum));
  }

  async create(data: TurmaInsert): Promise<Turma> {
    const results = await db.insert(turma).values(data).returning();

    if (!results[0]) {
      throw new Error("Erro ao criar turma, nenhum registro retornado.");
    }

    return results[0];
  }

  async update(id: string, data: Partial<TurmaInsert>): Promise<Turma> {
    const results = await db
      .update(turma)
      .set(data)
      .where(eq(turma.id, id))
      .returning();

    if (!results[0]) {
      throw new Error("Erro ao atualizar turma, nenhum registro retornado.");
    }

    return results[0];
  }

  async delete(id: string): Promise<boolean> {
    const results = await db.delete(turma).where(eq(turma.id, id)).returning();
    return results.length > 0;
  }
}
