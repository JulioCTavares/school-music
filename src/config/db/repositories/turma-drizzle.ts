import { eq } from "drizzle-orm";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import type { Turma, TurmaInsert } from "..";
import type { TurmaNivelEnum } from "../../../enums/turmaEnum";
import type { TurmaRepository } from "../../../repository/turma";
import { turma } from "../schemas/turma";

export class DrizzleTurmaRepository implements TurmaRepository {
  constructor(private db: PostgresJsDatabase) {}

  async findAll(): Promise<Turma[]> {
    return this.db.select().from(turma);
  }

  async findById(id: string): Promise<Turma | null> {
    const results = await this.db.select().from(turma).where(eq(turma.id, id));
    return results[0] ?? null;
  }

  async findByCodTurma(codTurma: string): Promise<Turma | null> {
    const results = await this.db
      .select()
      .from(turma)
      .where(eq(turma.cod_turma, codTurma));
    return results[0] ?? null;
  }

  async findByNivel(nivel: string): Promise<Turma[]> {
    return this.db
      .select()
      .from(turma)
      .where(eq(turma.nivel, nivel as TurmaNivelEnum));
  }

  async create(data: TurmaInsert): Promise<Turma> {
    const results = await this.db.insert(turma).values(data).returning();

    if (!results[0]) {
      throw new Error("Erro ao criar turma, nenhum registro retornado.");
    }

    return results[0];
  }

  async update(id: string, data: Partial<TurmaInsert>): Promise<Turma> {
    const results = await this.db
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
    const results = await this.db
      .delete(turma)
      .where(eq(turma.id, id))
      .returning();
    return results.length > 0;
  }
}
