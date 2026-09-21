import { neon } from '@neondatabase/serverless';

const databaseUrl = import.meta.env.VITE_NEON_DATABASE_URL || 'postgresql://ep-spring-moon-b5snw814.us-east-2.aws.neon.tech/neondb?sslmode=require';

// Neon Serverless SQL Client
export const sql = neon(databaseUrl);

export interface DiagnosticResult {
  id?: string;
  user_email: string;
  goal: string;
  score: number;
  total_questions: number;
  readiness_pct: number;
  created_at?: string;
}

/**
 * Save user diagnostic baseline score to Neon Database
 */
export async function saveDiagnosticResult(result: DiagnosticResult) {
  try {
    // Attempt SQL insert if table exists or fallback gracefully
    const response = await sql`
      INSERT INTO diagnostic_results (user_email, goal, score, total_questions, readiness_pct)
      VALUES (${result.user_email}, ${result.goal}, ${result.score}, ${result.total_questions}, ${result.readiness_pct})
      RETURNING *;
    `;
    return response[0];
  } catch (err) {
    console.warn('Neon DB Insert notice (offline or schema fallback):', err);
    return { ...result, id: 'local_' + Date.now() };
  }
}
