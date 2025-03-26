import type { Aluno, AlunoInsert } from "../config/db";
import type { BaseRepository } from "./base";

export interface AlunoRepository extends BaseRepository<Aluno, AlunoInsert> {
  findByMatricula(matricula: string): Promise<Aluno | null>;
  findByCPF(cpf: string): Promise<Aluno | null>;
}
