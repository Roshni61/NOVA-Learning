export interface LearnerContext {
  goal: string;
  activeCourse?: string;
  activeMisconceptions: string[];
  weakConcepts: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: number;
}

/**
 * Builds system prompt injecting the learner's telemetry and active knowledge gaps.
 */
export function buildSystemPrompt(learnerContext: LearnerContext): string {
  return `You are NOVA, an elite Socratic AI Learning Copilot.
The learner's target goal is: ${learnerContext.goal}.
Current active study: ${learnerContext.activeCourse || 'General Curriculum'}.
Active Knowledge Gaps to address: ${learnerContext.activeMisconceptions.length > 0 ? learnerContext.activeMisconceptions.join(', ') : 'None'}.
Weak Areas: ${learnerContext.weakConcepts.length > 0 ? learnerContext.weakConcepts.join(', ') : 'None'}.

Pedagogical Rules:
1. NEVER immediately give the complete code or direct answer to questions.
2. Ask guiding, thought-provoking Socratic questions to help the learner deduce the answer.
3. If the user struggles, provide progressive hints:
   - Level 1: Conceptual Clue / Intuitive Analogy
   - Level 2: Approach & Strategy Clue
   - Level 3: Pseudocode Structure
4. Keep responses concise (under 3 paragraphs), technical, and encouraging.`;
}

/**
 * Fallback Socratic Heuristic Responder if API Key is not set or network fails.
 */
function generateHeuristicResponse(userMessage: string, context: LearnerContext): string {
  const msg = userMessage.toLowerCase();

  if (msg.includes('hashmap') || msg.includes('collision') || msg.includes('gap')) {
    return `Great question! In HashMaps, when two keys compute to the exact same bucket index, a collision occurs.

**Level 1 Conceptual Clue:** Think of a parking lot where two cars are assigned spot #4. How would you handle placing the second car without overwriting the first?

Consider: Would you store both items together (chaining), or search for the next available open spot (open addressing)? Which approach fits your target goal of **${context.goal}**?`;
  }

  if (msg.includes('hint') || msg.includes('help')) {
    return `Let's break this down step-by-step:

**Level 2 Strategy Clue:** Look at the data structures involved. What is the time complexity of searching an array ($O(N)$) vs looking up a hash key ($O(1)$)?

What constraint is currently slowing down your execution pipeline?`;
  }

  if (msg.includes('test') || msg.includes('quiz')) {
    return `Here is a Socratic challenge for you:

If a HashMap's Load Factor ($\alpha = N / K$) reaches 0.75, what operational threshold does that trigger, and why don't we wait until $\alpha = 1.0$?

What do you think happens to average lookup time if we delay rehashing?`;
  }

  return `I see you are exploring **${context.activeCourse || 'AI Architecture'}** towards your goal as an **${context.goal}**.

**Socratic Question:** Before writing code, what is the core invariant or mathematical constraint you are trying to preserve here?

Share your initial hypothesis, and we will refine it together!`;
}

/**
 * Fetches Socratic completion from Gemini API or falls back to intelligent Socratic heuristics.
 */
export async function getSocraticResponse(
  userMessage: string,
  history: ChatMessage[],
  context: LearnerContext
): Promise<string> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_AI_API_KEY;

  if (!apiKey) {
    // Return intelligent heuristic responder fallback
    await new Promise((resolve) => setTimeout(resolve, 600));
    return generateHeuristicResponse(userMessage, context);
  }

  try {
    const systemPrompt = buildSystemPrompt(context);

    // Format conversation history for Gemini API
    const contents = [
      { role: 'user', parts: [{ text: systemPrompt }] },
      ...history.map((msg) => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }],
      })),
      { role: 'user', parts: [{ text: userMessage }] },
    ];

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents }),
      }
    );

    if (!response.ok) {
      console.warn('[aiTutorService] Gemini API returned error status, falling back to heuristics.');
      return generateHeuristicResponse(userMessage, context);
    }

    const data = await response.json();
    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    return replyText || generateHeuristicResponse(userMessage, context);
  } catch (error) {
    console.warn('[aiTutorService] Network exception, using Socratic fallback:', error);
    return generateHeuristicResponse(userMessage, context);
  }
}
