import { neon } from '@neondatabase/serverless';

const DEFAULT_DB_URL = 'postgresql://neondb_owner:npg_secret123@ep-spring-moon-b5snw814.us-east-2.aws.neon.tech/neondb?sslmode=require';

function getSqlInstance() {
  const envUrl = import.meta.env.VITE_NEON_DATABASE_URL;
  const urlToUse = envUrl && envUrl.includes('@') ? envUrl : DEFAULT_DB_URL;
  try {
    return neon(urlToUse);
  } catch (e) {
    console.warn('Neon connection fallback initialized:', e);
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
