import { sql } from "@vercel/postgres";

export async function fetchNotes() {
  try {
    const notes = await sql`SELECT * FROM notes`;
    return notes;
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw error;
  }
}
