import type { Aula, AulaInsert } from "../config/db";
import type { BaseRepository } from "./base";

export interface AulaRepository extends BaseRepository<Aula, AulaInsert> {
  findByCodAula(codAula: string): Promise<Aula | null>;
  findByDisciplina(disciplina: string): Promise<Aula[]>;
  findByTurma(idTurma: string): Promise<Aula[]>;
}
