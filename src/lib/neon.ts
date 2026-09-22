import { neon } from '@neondatabase/serverless';

function getSqlInstance() {
  const envUrl = import.meta.env.VITE_NEON_DATABASE_URL;
  if (!envUrl || typeof envUrl !== 'string' || !envUrl.includes('@')) {
    console.warn('VITE_NEON_DATABASE_URL is missing or invalid. Neon database connection disabled.');
    return null;
  }
  try {
    return neon(envUrl);
  } catch (e) {
    console.warn('Neon connection failed:', e);
    return null;
  }
}

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
    const sql = getSqlInstance();
    if (sql) {
      const response = await sql`
        INSERT INTO diagnostic_results (user_email, goal, score, total_questions, readiness_pct)
        VALUES (${result.user_email}, ${result.goal}, ${result.score}, ${result.total_questions}, ${result.readiness_pct})
        RETURNING *;
      `;
      return response[0];
    }
  } catch (err) {
    console.warn('Neon DB Insert notice (offline or schema fallback):', err);
  }
  return { ...result, id: 'local_' + Date.now() };
}
