import { neon } from '@neondatabase/serverless';
import type { User } from '../types';

function getSqlInstance() {
  const envUrl = import.meta.env.VITE_NEON_DATABASE_URL;
  if (!envUrl || typeof envUrl !== 'string' || !envUrl.includes('@')) {
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

/**
 * Save / update user record in Neon Database
 */
export async function saveUserToNeon(user: User): Promise<User | null> {
  try {
    const sql = getSqlInstance();
    if (sql) {
      const response = await sql`
        INSERT INTO users (id, name, email, avatar_url, role, xp, level, streak)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${user.avatarUrl || ''}, ${user.role}, ${user.xp || 0}, ${user.level || 1}, ${user.streak || 0})
        ON CONFLICT (email) DO UPDATE SET
          name = EXCLUDED.name,
          avatar_url = EXCLUDED.avatar_url,
          xp = EXCLUDED.xp,
          level = EXCLUDED.level,
          streak = EXCLUDED.streak
        RETURNING *;
      `;
      if (response && response[0]) {
        return {
          id: response[0].id,
          name: response[0].name,
          email: response[0].email,
          avatarUrl: response[0].avatar_url,
          role: response[0].role || 'student',
          xp: response[0].xp,
          level: response[0].level,
          streak: response[0].streak,
        };
      }
    }
  } catch (err) {
    console.warn('Neon DB User sync notice (offline or table fallback):', err);
  }
  return null;
}

/**
 * Fetch user record from Neon Database by email
 */
export async function fetchUserFromNeon(email: string): Promise<User | null> {
  try {
    const sql = getSqlInstance();
    if (sql) {
      const response = await sql`
        SELECT * FROM users WHERE email = ${email} LIMIT 1;
      `;
      if (response && response.length > 0) {
        const row = response[0];
        return {
          id: row.id,
          name: row.name,
          email: row.email,
          avatarUrl: row.avatar_url,
          role: row.role || 'student',
          xp: row.xp,
          level: row.level,
          streak: row.streak,
        };
      }
    }
  } catch (err) {
    console.warn('Neon DB User fetch notice (offline or table fallback):', err);
  }
  return null;
}
