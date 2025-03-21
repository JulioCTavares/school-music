import { eq } from "drizzle-orm";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import type { Pertence, PertenceInsert } from "..";
import type { PertenceRepository } from "../../../repository/pertence";
import { pertence } from "../schemas/pertence";

export class DrizzlePertenceRepository implements PertenceRepository {
  constructor(private db: PostgresJsDatabase) {}

  async findAll(): Promise<Pertence[]> {
    return this.db.select().from(pertence);
  }

  async findById(id: string): Promise<Pertence | null> {
    const results = await this.db
      .select()
      .from(pertence)
      .where(eq(pertence.id, id));
    return results[0] ?? null;
  }

  async findByAluno(alunoId: string): Promise<Pertence[]> {
    return this.db.select().from(pertence).where(eq(pertence.idAluno, alunoId));
  }

  async findByTurma(turmaId: string): Promise<Pertence[]> {
    return this.db.select().from(pertence).where(eq(pertence.idTurma, turmaId));
  }

  async create(data: PertenceInsert): Promise<Pertence> {
    const results = await this.db.insert(pertence).values(data).returning();

    if (!results[0]) {
      throw new Error("Erro ao criar pertence, nenhum registro retornado.");
    }

    return results[0];
  }

  async update(id: string, data: Partial<PertenceInsert>): Promise<Pertence> {
    const results = await this.db
      .update(pertence)
      .set(data)
      .where(eq(pertence.id, id))
      .returning();

    if (!results[0]) {
      throw new Error("Erro ao atualizar pertence, nenhum registro retornado.");
    }

    return results[0];
  }

  async delete(id: string): Promise<boolean> {
    const results = await this.db
      .delete(pertence)
      .where(eq(pertence.id, id))
      .returning();
    return results.length > 0;
  }
}
