import type { SeMatricula, SeMatriculaInsert } from "../config/db";
import type { BaseRepository } from "./base";

export interface SeMatriculaRepository
  extends BaseRepository<SeMatricula, SeMatriculaInsert> {
  findByAluno(matricula: string): Promise<SeMatricula[]>;
  findByAula(codAula: string): Promise<SeMatricula[]>;
}
