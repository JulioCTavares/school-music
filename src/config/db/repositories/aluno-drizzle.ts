import { eq } from "drizzle-orm";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import type { Aluno, AlunoInsert } from "..";
import type { AlunoRepository } from "../../../repository/aluno";
import { aluno } from "../schemas/aluno";

export class DrizzleAlunoRepository implements AlunoRepository {
  constructor(private db: PostgresJsDatabase) {}

  async findAll(): Promise<Aluno[]> {
    return this.db.select().from(aluno);
  }

  async findById(id: string): Promise<Aluno | null> {
    const [result] = await this.db.select().from(aluno).where(eq(aluno.id, id));
    return result ?? null;
  }

  async findByMatricula(matricula: string): Promise<Aluno | null> {
    const [result] = await this.db
      .select()
      .from(aluno)
      .where(eq(aluno.matricula, matricula));
    return result ?? null;
  }

  async findByCPF(cpf: string): Promise<Aluno | null> {
    const [result] = await this.db
      .select()
      .from(aluno)
      .where(eq(aluno.cpf, cpf));
    return result ?? null;
  }

  async create(data: AlunoInsert): Promise<Aluno> {
    const results = await this.db.insert(aluno).values(data).returning();

    if (!results[0]) {
      throw new Error("Falha ao criar aluno, nenhum registro retornado.");
    }

    return results[0];
  }

  async update(id: string, data: Partial<AlunoInsert>): Promise<Aluno> {
    const results = await this.db
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
    const results = await this.db
      .delete(aluno)
      .where(eq(aluno.id, id))
      .returning();
    return results.length > 0;
  }
}
