import type { Pertence, PertenceInsert } from "../config/db";
import type { BaseRepository } from "./base";

export interface PertenceRepository
  extends BaseRepository<Pertence, PertenceInsert> {
  findByAluno(matricula: string): Promise<Pertence[]>;
  findByTurma(codTurma: string): Promise<Pertence[]>;
}
