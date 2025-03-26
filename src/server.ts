// src/index.ts
import { drizzle } from "drizzle-orm/node-postgres";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";
import { Client } from "pg";
import { Dependencies } from "./dependencies";

// Initialize app
const app = new Hono();

// Middlewares
app.use("*", logger());
app.use("*", cors());
app.use("*", secureHeaders());

// Database connection
const connectionString =
  process.env.DATABASE_URL ||
  "postgres://postgres:postgres@localhost:5432/musica_db";
const client = new Client({ connectionString });
const db = drizzle(client);

// Initialize repositories
const alunoRepository = Dependencies.getAlunoRepository();
const professorRepository = Dependencies.getProfessorRepository();
const turmaRepository = Dependencies.getTurmaRepository();
const aulaRepository = Dependencies.getAulaRepository();
const instrumentoRepository = Dependencies.getInstrumentoRepository();
const pertenceRepository = Dependencies.getPertenceRepository();
const seMatriculaRepository = Dependencies.getMatriculaRepository();
const utilizaRepository = Dependencies.getUtilizaRepository();
const tocaRepository = Dependencies.getTocaRepository();

// Root route
app.get("/", (c) => {
  return c.json({ message: "Escola de Música API", status: "running" });
});

// Health check route
app.get("/health", (c) => {
  return c.json({ status: "healthy" });
});

// Alunos routes
app.get("/alunos", async (c) => {
  try {
    const alunos = await alunoRepository.findAll();
    return c.json(alunos);
  } catch (error) {
    console.error("Error fetching alunos:", error);
    return c.json({ error: "Failed to fetch alunos" }, 500);
  }
});

app.get("/alunos/:id", async (c) => {
  const id = parseInt(c.req.param("id"));
  try {
    const aluno = await alunoRepository.findById(id);
    if (!aluno) {
      return c.json({ error: "Aluno not found" }, 404);
    }
    return c.json(aluno);
  } catch (error) {
    console.error(`Error fetching aluno with id ${id}:`, error);
    return c.json({ error: "Failed to fetch aluno" }, 500);
  }
});

app.post("/alunos", async (c) => {
  try {
    const body = await c.req.json();
    const aluno = await alunoRepository.create(body);
    return c.json(aluno, 201);
  } catch (error) {
    console.error("Error creating aluno:", error);
    return c.json({ error: "Failed to create aluno" }, 500);
  }
});

// Professores routes
app.get("/professores", async (c) => {
  try {
    const professores = await professorRepository.findAll();
    return c.json(professores);
  } catch (error) {
    console.error("Error fetching professores:", error);
    return c.json({ error: "Failed to fetch professores" }, 500);
  }
});

// Turmas routes
app.get("/turmas", async (c) => {
  try {
    const turmas = await turmaRepository.findAll();
    return c.json(turmas);
  } catch (error) {
    console.error("Error fetching turmas:", error);
    return c.json({ error: "Failed to fetch turmas" }, 500);
  }
});

// Aulas routes
app.get("/aulas", async (c) => {
  try {
    const aulas = await aulaRepository.findAll();
    return c.json(aulas);
  } catch (error) {
    console.error("Error fetching aulas:", error);
    return c.json({ error: "Failed to fetch aulas" }, 500);
  }
});

// Instrumentos routes
app.get("/instrumentos", async (c) => {
  try {
    const instrumentos = await instrumentoRepository.findAll();
    return c.json(instrumentos);
  } catch (error) {
    console.error("Error fetching instrumentos:", error);
    return c.json({ error: "Failed to fetch instrumentos" }, 500);
  }
});

// Start server
const port = parseInt(process.env.PORT || "3000");
console.log(`Server running on port ${port}`);

export default {
  port,
  fetch: app.fetch,
};
