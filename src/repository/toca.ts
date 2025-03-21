import type { Toca, TocaInsert } from "../config/db";
import type { BaseRepository } from "./base";

export interface TocaRepository extends BaseRepository<Toca, TocaInsert> {
  findByAluno(matricula: string): Promise<Toca[]>;
  findByInstrumento(nSerie: string): Promise<Toca[]>;
}
