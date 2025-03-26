import type { Utiliza, UtilizaInsert } from "../config/db";
import type { BaseRepository } from "./base";

export interface UtilizaRepository
  extends BaseRepository<Utiliza, UtilizaInsert> {
  findByAula(idAula: string): Promise<Utiliza[]>;
  findByInstrumento(nSerie: string): Promise<Utiliza[]>;
}
