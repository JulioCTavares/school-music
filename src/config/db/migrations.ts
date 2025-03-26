import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Client } from "pg";

async function runMigrations() {
  const connectionString =
    process.env.DATABASE_URL ||
    "postgres://postgres:school@school_db:5432/school_db";

  console.log("Running migrations on:", connectionString);

  // Criar a conexão com o banco usando o cliente 'pg'
  const client = new Client({ connectionString });

  try {
    // Conectar ao banco
    await client.connect();

    // Usar drizzle-orm com o cliente 'pg'
    const db = drizzle(client);

    // Rodar migrações a partir da pasta de migrações especificada
    await migrate(db, { migrationsFolder: "./drizzle" });
    console.log("Migrations completed successfully!");
  } catch (error) {
    console.error("Error running migrations:", error);
    process.exit(1);
  } finally {
    // Fechar a conexão com o banco
    await client.end();
  }
}

runMigrations();
