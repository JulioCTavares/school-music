import { eq } from "drizzle-orm";
import { db, type Aluno, type AlunoInsert } from "..";
import type { AlunoRepository } from "../../../repository/aluno";
import { aluno } from "../schemas/aluno";

export class DrizzleAlunoRepository implements AlunoRepository {
  constructor() {}

  async findAll(): Promise<Aluno[]> {
    return db.select().from(aluno);
  }

  async findById(id: string): Promise<Aluno | null> {
    const [result] = await db.select().from(aluno).where(eq(aluno.id, id));
    return result ?? null;
  }

  async findByMatricula(matricula: string): Promise<Aluno | null> {
    const [result] = await db
      .select()
      .from(aluno)
      .where(eq(aluno.matricula, matricula));
    return result ?? null;
  }

  async findByCPF(cpf: string): Promise<Aluno | null> {
    const [result] = await db.select().from(aluno).where(eq(aluno.cpf, cpf));
    return result ?? null;
  }

  async create(data: AlunoInsert): Promise<Aluno> {
    const results = await db.insert(aluno).values(data).returning();

    if (!results[0]) {
      throw new Error("Falha ao criar aluno, nenhum registro retornado.");
    }

    return results[0];
  }

  async update(id: string, data: Partial<AlunoInsert>): Promise<Aluno> {
    const results = await db
      .update(aluno)
      .set(data)
      .where(eq(aluno.id, id))
      .returning();

    if (!results[0]) {
      throw new Error("Falha ao atualizar aluno, nenhum registro retornado.");
    }

    return results[0];
  }

  async delete(id: string): Promise<boolean> {
    const results = await db.delete(aluno).where(eq(aluno.id, id)).returning();
    return results.length > 0;
  }
}
