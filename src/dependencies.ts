import { DrizzleAlunoRepository } from "./config/db/repositories/aluno-drizzle";
import { DrizzleAulaRepository } from "./config/db/repositories/aula-drizzle";
import { DrizzleInstrumentoRepository } from "./config/db/repositories/instrumento-drizzle";
import { DrizzleSeMatriculaRepository } from "./config/db/repositories/matricula-drizzle";
import { DrizzlePertenceRepository } from "./config/db/repositories/pertence-drizzle";
import { DrizzleProfessorRepository } from "./config/db/repositories/professor-drizlle";
import { DrizzleTocaRepository } from "./config/db/repositories/toca-drizzle";
import { DrizzleTurmaRepository } from "./config/db/repositories/turma-drizzle";
import { DrizzleUtilizaRepository } from "./config/db/repositories/utiliza-drizzle";
import type { AlunoRepository } from "./repository/aluno";
import type { AulaRepository } from "./repository/aula";
import type { InstrumentoRepository } from "./repository/instrumento";
import type { SeMatriculaRepository } from "./repository/matricula";
import type { PertenceRepository } from "./repository/pertence";
import type { ProfessorRepository } from "./repository/professor";
import type { TocaRepository } from "./repository/toca";
import type { TurmaRepository } from "./repository/turma";
import type { UtilizaRepository } from "./repository/utiliza";

export class Dependencies {
  // Repositories
  private static _alunoRepository: AlunoRepository;
  private static _aulaRepository: AulaRepository;
  private static _professorRepository: ProfessorRepository;
  private static _instrumentoRepository: InstrumentoRepository;
  private static _matriculaRepository: SeMatriculaRepository;
  private static _pertenceRepository: PertenceRepository;
  private static _tocaRepository: TocaRepository;
  private static _turmaRepository: TurmaRepository;
  private static _utilizaRepository: UtilizaRepository;

  // Getters

  static getAlunoRepository(): AlunoRepository {
    if (!Dependencies._alunoRepository) {
      Dependencies._alunoRepository = new DrizzleAlunoRepository();
    }
    return Dependencies._alunoRepository;
  }

  static getAulaRepository(): AulaRepository {
    if (!Dependencies._aulaRepository) {
      Dependencies._aulaRepository = new DrizzleAulaRepository();
    }
    return Dependencies._aulaRepository;
  }

  static getProfessorRepository(): ProfessorRepository {
    if (!Dependencies._professorRepository) {
      Dependencies._professorRepository = new DrizzleProfessorRepository();
    }
    return Dependencies._professorRepository;
  }

  static getInstrumentoRepository(): InstrumentoRepository {
    if (!Dependencies._instrumentoRepository) {
      Dependencies._instrumentoRepository = new DrizzleInstrumentoRepository();
    }
    return Dependencies._instrumentoRepository;
  }

  static getMatriculaRepository(): SeMatriculaRepository {
    if (!Dependencies._matriculaRepository) {
      Dependencies._matriculaRepository = new DrizzleSeMatriculaRepository();
    }
    return Dependencies._matriculaRepository;
  }

  static getPertenceRepository(): PertenceRepository {
    if (!Dependencies._pertenceRepository) {
      Dependencies._pertenceRepository = new DrizzlePertenceRepository();
    }
    return Dependencies._pertenceRepository;
  }

  static getTocaRepository(): TocaRepository {
    if (!Dependencies._tocaRepository) {
      Dependencies._tocaRepository = new DrizzleTocaRepository();
    }
    return Dependencies._tocaRepository;
  }

  static getTurmaRepository(): TurmaRepository {
    if (!Dependencies._turmaRepository) {
      Dependencies._turmaRepository = new DrizzleTurmaRepository();
    }
    return Dependencies._turmaRepository;
  }

  static getUtilizaRepository(): UtilizaRepository {
    if (!Dependencies._utilizaRepository) {
      Dependencies._utilizaRepository = new DrizzleUtilizaRepository();
    }
    return Dependencies._utilizaRepository;
  }
}
