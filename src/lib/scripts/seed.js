// initial data seeding

const dotenv = require("dotenv");
const { db } = require("@vercel/postgres");
const { placeholderNotes } = require("../placeholder-data");

dotenv.config();

async function seedNotes(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    await client.sql`
      CREATE TABLE IF NOT EXISTS notes (
        id SERIAL PRIMARY KEY,
        type VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        content JSONB NOT NULL
      );
    `;

    console.log(`Created "notes" table`);

    const insertedNotes = await Promise.all(
      placeholderNotes.map(
        (note) => client.sql`
          INSERT INTO notes (id, type, title, content)
          VALUES (${note.id}, ${note.type}, ${note.title}, ${JSON.stringify(
          note.content
        )})
          ON CONFLICT (id) DO NOTHING;
        `
      )
    );

    console.log(`Seeded ${insertedNotes.length} notes`);

    return {
      notes: insertedNotes,
    };
  } catch (error) {
    console.error("Error seeding notes:", error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  try {
    await client.sql`BEGIN`;
    await seedNotes(client);
    await client.sql`COMMIT`;
  } catch (error) {
    await client.sql`ROLLBACK`;
    throw error;
  } finally {
    await client.end();
    process.exit(0);
  }
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});
