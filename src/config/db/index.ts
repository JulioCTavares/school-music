import { drizzle } from "drizzle-orm/node-postgres";
import type { aluno } from "./schemas/aluno";
import type { aula } from "./schemas/aula";
import type { instrumento } from "./schemas/instrumento";
import type { se_matricula } from "./schemas/matricula";
import type { pertence } from "./schemas/pertence";
import type { professor } from "./schemas/professor";
import type { toca } from "./schemas/toca";
import type { turma } from "./schemas/turma";
import type { utiliza } from "./schemas/utiliza";

export const db = drizzle(Bun.env.DATABASE_URL!);

export type Aluno = typeof aluno.$inferSelect;
export type AlunoInsert = typeof aluno.$inferInsert;

export type Professor = typeof professor.$inferSelect;
export type ProfessorInsert = typeof professor.$inferInsert;

export type Turma = typeof turma.$inferSelect;
export type TurmaInsert = typeof turma.$inferInsert;

export type Aula = typeof aula.$inferSelect;
export type AulaInsert = typeof aula.$inferInsert;

export type Pertence = typeof pertence.$inferSelect;
export type PertenceInsert = typeof pertence.$inferInsert;

export type SeMatricula = typeof se_matricula.$inferSelect;
export type SeMatriculaInsert = typeof se_matricula.$inferInsert;

export type Utiliza = typeof utiliza.$inferSelect;
export type UtilizaInsert = typeof utiliza.$inferInsert;

export type Instrumento = typeof instrumento.$inferSelect;
export type InstrumentoInsert = typeof instrumento.$inferInsert;

export type Toca = typeof toca.$inferSelect;
export type TocaInsert = typeof toca.$inferInsert;
