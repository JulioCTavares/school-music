import type { Professor, ProfessorInsert } from "../config/db";
import type { BaseRepository } from "./base";

export interface ProfessorRepository
  extends BaseRepository<Professor, ProfessorInsert> {
  findByNome(nome: string): Promise<Professor[]>;
  findByEspecialidade(especialidade: string): Promise<Professor[]>;
}
