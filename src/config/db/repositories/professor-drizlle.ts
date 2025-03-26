import { eq } from "drizzle-orm";
import { db, type Professor, type ProfessorInsert } from "..";
import type { ProfessorRepository } from "../../../repository/professor";
import { professor } from "../schemas/professor";

export class DrizzleProfessorRepository implements ProfessorRepository {
  constructor() {}

  async findAll(): Promise<Professor[]> {
    return db.select().from(professor);
  }

  async findById(id: string): Promise<Professor | null> {
    const results = await db
      .select()
      .from(professor)
      .where(eq(professor.id, id));
    return results[0] ?? null;
  }

  async findByNome(nome: string): Promise<Professor[]> {
    return db.select().from(professor).where(eq(professor.nome_prof, nome));
  }

  async findByEspecialidade(especialidade: string): Promise<Professor[]> {
    return db
      .select()
      .from(professor)
      .where(eq(professor.especialidade, especialidade));
  }

  async create(data: ProfessorInsert): Promise<Professor> {
    const results = await db.insert(professor).values(data).returning();
    if (!results[0]) {
      throw new Error("Erro ao criar professor, nenhum registro retornado.");
    }
    return results[0];
  }

  async update(id: string, data: Partial<ProfessorInsert>): Promise<Professor> {
    const results = await db
      .update(professor)
      .set(data)
      .where(eq(professor.id, id))
      .returning();

    if (!results[0]) {
      throw new Error(
        "Erro ao atualizar professor, nenhum registro retornado."
      );
    }

    return results[0];
  }

  async delete(id: string): Promise<boolean> {
    const results = await db
      .delete(professor)
      .where(eq(professor.id, id))
      .returning();
    return results.length > 0;
  }
}
