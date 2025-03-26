import { eq } from "drizzle-orm";
import { db, type SeMatricula, type SeMatriculaInsert } from "..";
import type { SeMatriculaRepository } from "../../../repository/matricula";
import { se_matricula } from "../schemas/matricula";

export class DrizzleSeMatriculaRepository implements SeMatriculaRepository {
  constructor() {}

  async findAll(): Promise<SeMatricula[]> {
    return db.select().from(se_matricula);
  }

  async findById(id: string): Promise<SeMatricula | null> {
    const results = await db
      .select()
      .from(se_matricula)
      .where(eq(se_matricula.id, id));
    return results[0] ?? null;
  }

  async findByAluno(matricula: string): Promise<SeMatricula[]> {
    return db
      .select()
      .from(se_matricula)
      .where(eq(se_matricula.cod_matricula, matricula));
  }

  async findByAula(aulaId: string): Promise<SeMatricula[]> {
    return db
      .select()
      .from(se_matricula)
      .where(eq(se_matricula.idAula, aulaId));
  }

  async create(data: SeMatriculaInsert): Promise<SeMatricula> {
    const results = await db.insert(se_matricula).values(data).returning();

    if (!results[0]) {
      throw new Error("Erro ao criar matricula, nenhum registro retornado.");
    }

    return results[0];
  }

  async update(
    id: string,
    data: Partial<SeMatriculaInsert>
  ): Promise<SeMatricula> {
    const results = await db
      .update(se_matricula)
      .set(data)
      .where(eq(se_matricula.id, id))
      .returning();

    if (!results[0]) {
      throw new Error(
        "Erro ao atualizar matricula, nenhum registro retornado."
      );
    }

    return results[0];
  }

  async delete(id: string): Promise<boolean> {
    const results = await db
      .delete(se_matricula)
      .where(eq(se_matricula.id, id))
      .returning();
    return results.length > 0;
  }
}
