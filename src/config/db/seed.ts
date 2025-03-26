import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";

import {
  aluno,
  aula,
  instrumento,
  pertence,
  professor,
  se_matricula as seMatricula,
  toca,
  turma,
  utiliza,
} from "./schemas";

async function seed() {
  console.log("Starting database seed...");

  const connectionString =
    process.env.DATABASE_URL ||
    "postgres://postgres:school@school_db:5432/school_db";
  const client = new Client({ connectionString });

  await client.connect();
  const db = drizzle(client);

  try {
    console.log("Clearing existing data...");
    await db.delete(toca);
    await db.delete(utiliza);
    await db.delete(seMatricula);
    await db.delete(pertence);
    await db.delete(aluno);
    await db.delete(aula);
    await db.delete(professor);
    await db.delete(turma);
    await db.delete(instrumento);

    console.log("Seeding Alunos...");
    const alunos = await db
      .insert(aluno)
      .values([
        {
          nome: "Maria Silva",
          idade: 18,
          matricula: "A001",
          cpf: "123.456.789-01",
          idAluno: "123.456.789-01",
        },
        {
          nome: "João Santos",
          idade: 20,
          matricula: "A002",
          cpf: "234.567.890-12",
          idAluno: "234.567.890-12",
        },
        {
          nome: "Ana Pereira",
          idade: 19,
          matricula: "A003",
          cpf: "345.678.901-23",
          idAluno: "345.678.901-23",
        },
        {
          nome: "Carlos Oliveira",
          idade: 21,
          matricula: "A004",
          cpf: "456.789.012-34",
          idAluno: "456.789.012-34",
        },
        {
          nome: "Julia Costa",
          idade: 18,
          matricula: "A005",
          cpf: "567.890.123-45",
          idAluno: "567.890.123-45",
        },
      ])
      .returning();

    // Seed Professores
    console.log("Seeding Professores...");

    // Seed Turmas
    console.log("Seeding Turmas...");
    const turmas = await db
      .insert(turma)
      .values([
        { cod_turma: "T001", turno: "manha", nivel: "iniciante" },
        { cod_turma: "T002", turno: "tarde", nivel: "intermediario" },
        { cod_turma: "T003", turno: "noite", nivel: "avancado" },
        { cod_turma: "T004", turno: "manha", nivel: "intermediario" },
        { cod_turma: "T005", turno: "tarde", nivel: "iniciante" },
      ])
      .returning();

    // Seed Aulas
    console.log("Seeding Aulas...");
    const aulas = await db
      .insert(aula)
      .values([
        {
          horario: "08:00",
          disciplina: "Piano Básico",
          cod_aula: "A001",
          nr_sala: "101",
          idTurma: turmas[0]?.id,
        },
        {
          horario: "10:00",
          disciplina: "Violão Popular",
          cod_aula: "A002",
          nr_sala: "102",
          idTurma: turmas[1]?.id,
        },
        {
          horario: "14:00",
          disciplina: "Teoria Musical",
          cod_aula: "A003",
          nr_sala: "201",
          idTurma: turmas[2]?.id,
        },
        {
          horario: "16:00",
          disciplina: "Percussão",
          cod_aula: "A004",
          nr_sala: "103",
          idTurma: turmas[3]?.id,
        },
        {
          horario: "19:00",
          disciplina: "Composição",
          cod_aula: "A005",
          nr_sala: "202",
          idTurma: turmas[4]?.id,
        },
      ])
      .returning();

    const professores = await db
      .insert(professor)
      .values([
        {
          nome_prof: "Roberto Almeida",
          especialidade: "Piano",
          chave: "P001",
          idAula: aulas[0]?.id,
        },
        {
          nome_prof: "Claudia Ferreira",
          especialidade: "Violão",
          chave: "P002",
          idAula: aulas[1]?.id,
        },
        {
          nome_prof: "Fernando Gomes",
          especialidade: "Bateria",
          chave: "P003",
          idAula: aulas[3]?.id,
        },
        {
          nome_prof: "Helena Dias",
          especialidade: "Canto",
          chave: "P004",
          idAula: aulas[4]?.id,
        },
        {
          nome_prof: "Marcos Lima",
          especialidade: "Violino",
          chave: "P005",
          idAula: aulas[2]?.id,
        },
      ])
      .returning();

    // Seed Instrumentos
    console.log("Seeding Instrumentos...");
    const instrumentos = await db
      .insert(instrumento)
      .values([
        { n_serie: "INS001", tipo: "Piano" },
        { n_serie: "INS002", tipo: "Violão" },
        { n_serie: "INS003", tipo: "Bateria" },
        { n_serie: "INS004", tipo: "Violino" },
        { n_serie: "INS005", tipo: "Flauta" },
      ])
      .returning();

    // Seed Relacionamentos: Pertence
    console.log("Seeding Pertence relationships...");
    await db.insert(pertence).values([
      { idTurma: turmas[1]?.id, idAluno: alunos[0]?.id },
      { idTurma: turmas[1]?.id, idAluno: alunos[1]?.id },
      { idTurma: turmas[0]?.id, idAluno: alunos[2]?.id },
      { idTurma: turmas[3]?.id, idAluno: alunos[3]?.id },
      { idTurma: turmas[2]?.id, idAluno: alunos[4]?.id },
    ]);

    // Seed Relacionamentos: Se_Matricula
    console.log("Seeding Se_Matricula relationships...");
    await db.insert(seMatricula).values([
      { cod_matricula: "SM001", idAluno: alunos[0]?.id, idAula: aulas[0]?.id },
      { cod_matricula: "SM002", idAluno: alunos[1]?.id, idAula: aulas[1]?.id },
      { cod_matricula: "SM003", idAluno: alunos[2]?.id, idAula: aulas[0]?.id },
      { cod_matricula: "SM004", idAluno: alunos[3]?.id, idAula: aulas[2]?.id },
      { cod_matricula: "SM005", idAluno: alunos[4]?.id, idAula: aulas[4]?.id },
    ]);

    // Seed Relacionamentos: Utiliza
    console.log("Seeding Utiliza relationships...");
    await db.insert(utiliza).values([
      { idAula: aulas[0]?.id, idInstrumento: instrumentos[0]?.id },
      { idAula: aulas[1]?.id, idInstrumento: instrumentos[1]?.id },
      { idAula: aulas[3]?.id, idInstrumento: instrumentos[2]?.id },
      { idAula: aulas[4]?.id, idInstrumento: instrumentos[1]?.id },
      { idAula: aulas[2]?.id, idInstrumento: instrumentos[4]?.id },
    ]);

    // Seed Relacionamentos: Toca
    console.log("Seeding Toca relationships...");
    await db.insert(toca).values([
      { idAluno: alunos[0]?.id, idInstrumento: instrumentos[0]?.id },
      { idAluno: alunos[1]?.id, idInstrumento: instrumentos[1]?.id },
      { idAluno: alunos[2]?.id, idInstrumento: instrumentos[4]?.id },
      { idAluno: alunos[3]?.id, idInstrumento: instrumentos[2]?.id },
      { idAluno: alunos[4]?.id, idInstrumento: instrumentos[3]?.id },
    ]);

    console.log("Seed completed successfully!");
  } catch (error) {
    console.error("Error during seed operation:", error);
  } finally {
    await client.end();
  }
}

seed();
