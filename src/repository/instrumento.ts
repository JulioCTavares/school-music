import type { Instrumento, InstrumentoInsert } from "../config/db";
import type { BaseRepository } from "./base";

export interface InstrumentoRepository
  extends BaseRepository<Instrumento, InstrumentoInsert> {
  findByNSerie(nSerie: string): Promise<Instrumento | null>;
  findByTipo(tipo: string): Promise<Instrumento[]>;
}
