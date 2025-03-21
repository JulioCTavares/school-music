import type { Turma, TurmaInsert } from "../config/db";
import type { BaseRepository } from "./base";

export interface TurmaRepository extends BaseRepository<Turma, TurmaInsert> {
  findByCodTurma(codTurma: string): Promise<Turma | null>;
  findByNivel(nivel: string): Promise<Turma[]>;
}
