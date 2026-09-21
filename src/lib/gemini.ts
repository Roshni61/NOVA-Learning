import { GoogleGenAI } from '@google/genai';

export interface GeneratedQuestion {
  questionId: string;
  id: string;
  missionId: string;
  concept: string;
  difficulty: string;
  question: string;
  options: string[];
  answer: number;
  correctAnswer: number; // 0, 1, 2, or 3
  explanation: string;
  type?: 'mcq' | 'conceptual' | 'scenario' | 'code' | 'debugging' | 'numerical';
}

export interface MissionQuestionContext {
  missionId: string;
  title: string;
  concept: string;
  subConcept?: string;
  learningObjective?: string;
  difficulty?: string;
  learnerMastery?: number;
  previousPerformance?: string;
}

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.GEMINI_API_KEY || '';

const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

/**
 * Helper to normalize mission context input
 */
function normalizeContext(
  input: string | MissionQuestionContext,
  defaultDifficulty = 'Intermediate'
): Required<MissionQuestionContext> {
  if (typeof input === 'object' && input !== null) {
    return {
      missionId: input.missionId || 'backpropagation-computational-graphs',
      title: input.title || 'Backpropagation & Computational Graphs',
      concept: input.concept || 'Backpropagation & Autograd',
      subConcept: input.subConcept || input.title || 'Gradient Propagation',
      learningObjective: input.learningObjective || 'Master mission core concepts and algorithmic execution',
      difficulty: input.difficulty || defaultDifficulty,
      learnerMastery: input.learnerMastery ?? 78,
      previousPerformance: input.previousPerformance || 'Solid initial grasp with active practice in tensor derivatives',
    };
  }

  // Handle string title input
  const titleStr = input || 'Backpropagation & Computational Graphs';
  let mId = 'backpropagation-computational-graphs';
  let concept = titleStr;

  if (titleStr.toLowerCase().includes('matrix')) {
    mId = 'matrix-calculus-gradient-descent';
    concept = 'Multivariate Calculus';
  } else if (titleStr.toLowerCase().includes('numpy') || titleStr.toLowerCase().includes('loss')) {
    mId = 'numpy-loss-functions';
    concept = 'Loss Functions & Vectorization';
  } else if (titleStr.toLowerCase().includes('hash')) {
    mId = 'hashmap-and-hashing';
    concept = 'HashMap & Hashing';
  }

  return {
    missionId: mId,
    title: titleStr,
    concept: concept,
    subConcept: titleStr,
    learningObjective: 'Master mission core concepts and algorithmic execution',
    difficulty: defaultDifficulty,
    learnerMastery: 78,
    previousPerformance: 'Active practice across mission concepts',
  };
}

/**
 * Generate 10 AI-based mission-aware questions for a mission using Gemini API or intelligent mission-aware fallback
 */
export async function generateMissionQuestions(
  contextInput: string | MissionQuestionContext,
  overrideDifficulty = 'Intermediate'
): Promise<GeneratedQuestion[]> {
  const ctx = normalizeContext(contextInput, overrideDifficulty);

  if (ai) {
    try {
      const prompt = `You are NOVA's Mission-Aware Learning Intelligence Engine.
Generate exactly 10 high-quality, diverse questions strictly focused on the current learning mission context.

MISSION CONTEXT:
- missionId: "${ctx.missionId}"
- mission title: "${ctx.title}"
- concept: "${ctx.concept}"
- subConcept: "${ctx.subConcept}"
- learning objective: "${ctx.learningObjective}"
- difficulty: "${ctx.difficulty}"
- learner mastery: ${ctx.learnerMastery}%
- previous performance: "${ctx.previousPerformance}"

EXAMPLE TOPIC EXPECTATIONS:
- Backpropagation mission -> questions about computational graphs, chain rule, gradients, forward/backward propagation.
- Matrix Calculus mission -> questions about derivatives, Jacobians, gradients and matrix operations.
- NumPy Loss Function mission -> questions about loss functions, vectorization, NumPy implementation and debugging.
- HashMap mission -> questions about hashing, collisions, lookup, insertion, complexity and applications.

RULES:
1. All 10 questions MUST be directly about the current mission context ("${ctx.title}"). Never generate generic questions.
2. Include missionId: "${ctx.missionId}" in every question object.
3. Format output as a strict JSON array of 10 objects with keys:
   - questionId: string (e.g. "q1")
   - missionId: "${ctx.missionId}"
   - concept: "${ctx.concept}"
   - difficulty: "${ctx.difficulty}"
   - question: string
   - options: array of 4 string choices
   - answer: integer (0, 1, 2, or 3 index of correct choice)
   - correctAnswer: integer (0, 1, 2, or 3 index of correct choice)
   - explanation: string explaining why the answer is correct and common misconceptions
   - type: one of ["mcq", "conceptual", "scenario", "code", "debugging", "numerical"]

Return ONLY valid JSON array without markdown codeblock formatting.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const text = response.text || '';
      const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanJson);
      if (Array.isArray(parsed) && parsed.length >= 5) {
        return parsed.slice(0, 10).map((q, idx) => {
          const ansIndex = typeof q.answer === 'number' ? q.answer : typeof q.correctAnswer === 'number' ? q.correctAnswer : 0;
          const qId = q.questionId || q.id || `q${idx + 1}`;
          return {
            questionId: qId,
            id: qId,
            missionId: ctx.missionId,
            concept: q.concept || ctx.concept,
            difficulty: q.difficulty || ctx.difficulty,
            question: q.question,
            options: q.options || ['Option A', 'Option B', 'Option C', 'Option D'],
            answer: ansIndex,
            correctAnswer: ansIndex,
            explanation: q.explanation || 'Refer to mission formulation for concept step breakdown.',
            type: q.type || 'conceptual',
          };
        });
      }
    } catch (err) {
      console.warn('Gemini API query notice (using mission-aware fallback dataset):', err);
    }
  }

  // Return mission-aware 10-question fallback dataset tailored specifically to ctx.missionId
  return getMissionAwareFallbackQuestions(ctx);
}

/**
 * High-fidelity 10-question fallback datasets strictly tailored by missionId
 */
function getMissionAwareFallbackQuestions(ctx: MissionQuestionContext): GeneratedQuestion[] {
  const mId = ctx.missionId;

  // 1. Backpropagation & Computational Graphs
  if (mId === 'backpropagation-computational-graphs' || ctx.title.toLowerCase().includes('backprop')) {
    return [
      {
        questionId: 'q1',
        id: 'q1',
        missionId: 'backpropagation-computational-graphs',
        concept: 'Computational Graphs',
        difficulty: ctx.difficulty,
        question: 'In computational graph backpropagation, how is the partial derivative dL/dx for an input variable calculated during the backward sweep?',
        options: [
          'By multiplying the incoming upstream gradient dL/dy by the local partial derivative dy/dx using the chain rule.',
          'By dividing the final scalar loss by the total number of operations in the forward pass.',
          'By re-evaluating the forward pass with perturbed input values x + 0.01.',
          'By initializing all intermediate variable gradients to 1.0 simultaneously.',
        ],
        answer: 0,
        correctAnswer: 0,
        explanation: 'Backpropagation relies on the multivariate chain rule: upstream gradient dL/dy is multiplied by the local gradient dy/dx to get dL/dx.',
        type: 'conceptual',
      },
      {
        questionId: 'q2',
        id: 'q2',
        missionId: 'backpropagation-computational-graphs',
        concept: 'Reverse Topological Order',
        difficulty: ctx.difficulty,
        question: 'Which graph traversal strategy ensures nodes are evaluated in valid dependency order during autograd backpropagation?',
        options: [
          'Reverse Topological Sort',
          'Breadth-First Search (BFS)',
          'Pre-order Binary Tree Traversal',
          'Dijkstra Shortest Path Traversal',
        ],
        answer: 0,
        correctAnswer: 0,
        explanation: 'Reverse topological sorting processes dependent child nodes before parent nodes so all upstream gradients are ready before local computation.',
        type: 'mcq',
      },
      {
        questionId: 'q3',
        id: 'q3',
        missionId: 'backpropagation-computational-graphs',
        concept: 'Multivariate Chain Rule',
        difficulty: ctx.difficulty,
        question: 'When an intermediate variable u in a computational graph feeds into two downstream branches (y and z), how is dL/du computed?',
        options: [
          'By accumulating (summing) the gradients from both downstream paths: dL/du = (dL/dy * dy/du) + (dL/dz * dz/du).',
          'By taking the maximum gradient value between the two branches.',
          'By averaging the two branch gradients.',
          'By keeping only the rightmost branch gradient.',
        ],
        answer: 0,
        correctAnswer: 0,
        explanation: 'The multivariate chain rule states that when a variable affects loss through multiple paths, gradients from all paths are accumulated (summed).',
        type: 'conceptual',
      },
      {
        questionId: 'q4',
        id: 'q4',
        missionId: 'backpropagation-computational-graphs',
        concept: 'Addition Node Gradient Flow',
        difficulty: ctx.difficulty,
        question: 'In a computational graph node computing addition `z = x + y`, what are the local partial derivatives dz/dx and dz/dy?',
        options: [
          'dz/dx = 1.0 and dz/dy = 1.0 (gradient passes through unchanged to both inputs).',
          'dz/dx = y and dz/dy = x.',
          'dz/dx = 0.0 and dz/dy = 0.0.',
          'dz/dx = x + y and dz/dy = x + y.',
        ],
        answer: 0,
        correctAnswer: 0,
        explanation: 'Since d(x + y)/dx = 1 and d(x + y)/dy = 1, an addition node acts as a gradient router that distributes upstream gradient equally to both inputs.',
        type: 'numerical',
      },
      {
        questionId: 'q5',
        id: 'q5',
        missionId: 'backpropagation-computational-graphs',
        concept: 'Multiplication Node Gradient Flow',
        difficulty: ctx.difficulty,
        question: 'For a multiplication operation node `z = x * y`, what is the local derivative dz/dx?',
        options: [
          'y (the current forward-pass value of the co-operand)',
          'x (the value of the target operand)',
          '1.0',
          '0.0',
        ],
        answer: 0,
        correctAnswer: 0,
        explanation: 'The derivative of z = x * y with respect to x is y, which requires storing the forward-pass value of y in memory for backpropagation.',
        type: 'conceptual',
      },
      {
        questionId: 'q6',
        id: 'q6',
        missionId: 'backpropagation-computational-graphs',
        concept: 'Autograd Activation Storage',
        difficulty: ctx.difficulty,
        question: 'Why do deep learning autograd engines (e.g. PyTorch, Micrograd) consume extra memory during training compared to inference?',
        options: [
          'They must cache intermediate activation values during the forward pass to compute local derivatives during the backward pass.',
          'They duplicate model weight matrices for each mini-batch sample.',
          'They store past gradient histories for all training epochs.',
          'They run background garbage collection threads.',
        ],
        answer: 0,
        correctAnswer: 0,
        explanation: 'Evaluating local gradients (like multiplication or activation derivatives) during backprop requires caching intermediate forward activations.',
        type: 'scenario',
      },
      {
        questionId: 'q7',
        id: 'q7',
        missionId: 'backpropagation-computational-graphs',
        concept: 'Vanishing Gradients',
        difficulty: ctx.difficulty,
        question: 'What is the mathematical cause of the vanishing gradient problem in deep computational graphs using Sigmoid activations?',
        options: [
          'Sigmoid derivative d/dx Sigmoid(x) maxes out at 0.25, causing repeated multiplication across N layers to shrink gradients exponentially toward zero.',
          'Addition nodes multiply gradients by negative numbers.',
          'Leaf nodes overflow 64-bit floating point precision.',
          'Forward pass computational graphs delete backward links.',
        ],
        answer: 0,
        correctAnswer: 0,
        explanation: 'Because Sigmoid derivative values are <= 0.25, chain-rule multiplication across many deep layers results in near-zero gradients at early layers.',
        type: 'conceptual',
      },
      {
        questionId: 'q8',
        id: 'q8',
        missionId: 'backpropagation-computational-graphs',
        concept: 'Autograd Debugging',
        difficulty: ctx.difficulty,
        question: 'Debug snippet: Running `loss.backward()` twice in a training loop without calling `optimizer.zero_grad()`. What defect occurs?',
        options: [
          'Gradients accumulate into `.grad` buffers, doubling gradient magnitude and breaking gradient descent step updates.',
          'The GPU immediately throws an out-of-memory Segmentation Fault.',
          'The loss scalar value resets to 0.0.',
          'Model weight tensors become immutable.',
        ],
        answer: 0,
        correctAnswer: 0,
        explanation: 'Autograd engines accumulate gradients onto existing `.grad` values by default; missing `zero_grad()` accumulates stale gradients.',
        type: 'debugging',
      },
      {
        questionId: 'q9',
        id: 'q9',
        missionId: 'backpropagation-computational-graphs',
        concept: 'Leaf Node Definition',
        difficulty: ctx.difficulty,
        question: 'In PyTorch / autograd computational graphs, what distinguishes a Leaf Tensor from an Intermediate Tensor?',
        options: [
          'Leaf tensors are created explicitly by the user (like weight parameters) rather than resulting from graph operations.',
          'Leaf tensors have no gradient buffers.',
          'Leaf tensors are deleted immediately after the forward pass.',
          'Leaf tensors can only store integer data types.',
        ],
        answer: 0,
        correctAnswer: 0,
        explanation: 'Leaf tensors are root inputs (weights, biases, inputs) created directly by the user, whereas non-leaf tensors are generated by graph nodes.',
        type: 'mcq',
      },
      {
        questionId: 'q10',
        id: 'q10',
        missionId: 'backpropagation-computational-graphs',
        concept: 'Vector-Jacobian Product (VJP)',
        difficulty: ctx.difficulty,
        question: 'Why do modern reverse-mode autograd frameworks compute Vector-Jacobian Products (VJPs) rather than full explicit Jacobian matrices?',
        options: [
          'VJP computes gradient v^T * J directly in O(N) time without allocating massive N x M Jacobian matrices in GPU memory.',
          'Explicit Jacobians cannot be represented in binary floating point.',
          'VJPs convert non-convex loss functions into linear equations.',
          'Reverse-mode autograd only works on 1D vectors.',
        ],
        answer: 0,
        correctAnswer: 0,
        explanation: 'Computing Vector-Jacobian Products avoids instantiating large intermediate Jacobian matrices, keeping memory complexity efficient.',
        type: 'conceptual',
      },
    ];
  }

  // 2. Matrix Calculus for Gradient Descent
  if (mId === 'matrix-calculus-gradient-descent' || ctx.title.toLowerCase().includes('matrix')) {
    return [
      {
        questionId: 'q1',
        id: 'q1',
        missionId: 'matrix-calculus-gradient-descent',
        concept: 'Gradient Dimension Matching',
        difficulty: ctx.difficulty,
        question: 'Given a scalar loss L and a weight matrix W of dimension (128, 64), what MUST be the shape of the gradient tensor dL/dW?',
        options: [
          'Exactly (128, 64), matching the shape of W.',
          'Transposed shape (64, 128).',
          'Flattened vector shape (8192, 1).',
          'Scalar shape (1, 1).',
        ],
        answer: 0,
        correctAnswer: 0,
        explanation: 'In matrix calculus, the gradient of a scalar loss with respect to a parameter matrix always matches the parameter matrix dimensions.',
        type: 'numerical',
      },
      {
        questionId: 'q2',
        id: 'q2',
        missionId: 'matrix-calculus-gradient-descent',
        concept: 'Matrix Product Derivative',
        difficulty: ctx.difficulty,
        question: 'For linear transformation output Y = X @ W (where X is (32, 128) and W is (128, 64)), what is the matrix derivative dL/dW given output gradient dL/dY (32, 64)?',
        options: [
          'X^T @ dL/dY with resulting shape (128, 64)',
          'dL/dY @ X^T with resulting shape (32, 32)',
          'X @ dL/dY with resulting shape (32, 64)',
          'W @ dL/dY^T with resulting shape (128, 32)',
        ],
        answer: 0,
        correctAnswer: 0,
        explanation: 'Applying matrix differentiation rules: dL/dW = X^T @ dL/dY. Inner dimension (32) cancels, leaving shape (128, 64).',
        type: 'code',
      },
      {
        questionId: 'q3',
        id: 'q3',
        missionId: 'matrix-calculus-gradient-descent',
        concept: 'Jacobian Matrix Definition',
        difficulty: ctx.difficulty,
        question: 'What is a Jacobian matrix J in multivariate matrix calculus?',
        options: [
          'A matrix containing all first-order partial derivatives of a vector-valued function f: R^n -> R^m.',
          'A diagonal matrix of vector eigenvalues.',
          'The inverse matrix of second-order loss derivatives.',
          'An orthogonal matrix used for QR decomposition.',
        ],
        answer: 0,
        correctAnswer: 0,
        explanation: 'The Jacobian J_ij = df_i / dx_j maps input vector variations to output vector variations across multi-dimensional spaces.',
        type: 'conceptual',
      },
      {
        questionId: 'q4',
        id: 'q4',
        missionId: 'matrix-calculus-gradient-descent',
        concept: 'Gradient Step Formula',
        difficulty: ctx.difficulty,
        question: 'What is the standard matrix gradient descent update rule for parameter matrix W given learning rate alpha and gradient dL/dW?',
        options: [
          'W_new = W_old - alpha * dL/dW',
          'W_new = W_old + alpha * dL/dW',
          'W_new = W_old / (alpha * dL/dW)',
          'W_new = dL/dW - alpha * W_old',
        ],
        answer: 0,
        correctAnswer: 0,
        explanation: 'Gradient descent steps in the direction of steepest loss decrease, which is opposite to the gradient vector: W - alpha * dL/dW.',
        type: 'mcq',
      },
      {
        questionId: 'q5',
        id: 'q5',
        missionId: 'matrix-calculus-gradient-descent',
        concept: 'Hessian Matrix Properties',
        difficulty: ctx.difficulty,
        question: 'What does the Hessian matrix H measure on a multivariate loss surface?',
        options: [
          'Second-order partial derivatives measuring local curvature and loss surface steepness.',
          'First-order direction of maximum loss increase.',
          'The average activation value across all hidden layers.',
          'The ratio of true positive predictions to false positives.',
        ],
        answer: 0,
        correctAnswer: 0,
        explanation: 'The Hessian H_ij = d^2 L / (dx_i dx_j) measures loss curvature, helping identify saddle points and optimal step sizes.',
        type: 'conceptual',
      },
      {
        questionId: 'q6',
        id: 'q6',
        missionId: 'matrix-calculus-gradient-descent',
        concept: 'Matrix Input Gradient dL/dX',
        difficulty: ctx.difficulty,
        question: 'In Y = X @ W (where X is batch (32, 128) and W is weights (128, 64)), how is the gradient w.r.t input X (dL/dX) calculated?',
        options: [
          'dL/dY @ W^T with shape (32, 128)',
          'W^T @ dL/dY with shape (128, 64)',
          'X^T @ dL/dY with shape (128, 64)',
          'dL/dY @ X with shape (32, 128)',
        ],
        answer: 0,
        correctAnswer: 0,
        explanation: 'To compute input gradient for backpropagation into earlier layers: dL/dX = dL/dY @ W^T, producing shape (32, 128).',
        type: 'numerical',
      },
      {
        questionId: 'q7',
        id: 'q7',
        missionId: 'matrix-calculus-gradient-descent',
        concept: 'Momentum Parameter Update',
        difficulty: ctx.difficulty,
        question: 'How does Momentum modify the matrix gradient descent update step?',
        options: [
          'It maintains a velocity vector V = beta * V + (1 - beta) * dL/dW and updates W = W - alpha * V to damp oscillations.',
          'It multiplies the weight matrix by random noise vectors.',
          'It sets all negative gradient entries to 0.',
          'It forces the learning rate to double every 10 iterations.',
        ],
        answer: 0,
        correctAnswer: 0,
        explanation: 'Momentum accumulates velocity along consistent gradient directions, accelerating convergence across flat plateaus and reducing ravine oscillations.',
        type: 'scenario',
      },
      {
        questionId: 'q8',
        id: 'q8',
        missionId: 'matrix-calculus-gradient-descent',
        concept: 'Exploding Gradients',
        difficulty: ctx.difficulty,
        question: 'What occurs during matrix gradient descent when spectral norms of weight derivative matrices exceed 1.0 across deep iterations?',
        options: [
          'Exploding gradients, causing weight values to saturate to NaN or Inf.',
          'Instant convergence to global loss minimum.',
          'Zeroing out of all bias parameters.',
          'Automatic batch size doubling.',
        ],
        answer: 0,
        correctAnswer: 0,
        explanation: 'Repeated multiplication of matrix derivatives with eigenvalues > 1.0 causes exponential growth in gradient norms (exploding gradients).',
        type: 'debugging',
      },
      {
        questionId: 'q9',
        id: 'q9',
        missionId: 'matrix-calculus-gradient-descent',
        concept: 'Elementwise Hadamard Derivative',
        difficulty: ctx.difficulty,
        question: 'When an elementwise activation function f(Z) is applied to matrix Z, how is its derivative combined with incoming gradient dL/dA?',
        options: [
          'Hadamard (elementwise) multiplication: dL/dZ = dL/dA * f\'(Z)',
          'Matrix dot product: dL/dZ = dL/dA @ f\'(Z)',
          'Matrix inversion: dL/dZ = (dL/dA)^-1',
          'Cross product: dL/dZ = dL/dA x f\'(Z)',
        ],
        answer: 0,
        correctAnswer: 0,
        explanation: 'Elementwise activation functions act independently on each matrix cell, so their local derivatives combine via elementwise (Hadamard) multiplication.',
        type: 'mcq',
      },
      {
        questionId: 'q10',
        id: 'q10',
        missionId: 'matrix-calculus-gradient-descent',
        concept: 'Frobenius Norm Gradient Clipping',
        difficulty: ctx.difficulty,
        question: 'What is the purpose of computing the Frobenius norm ||dL/dW||_F during matrix optimization?',
        options: [
          'To clip total gradient norm if it exceeds a threshold C: dW = dW * (C / ||dW||_F) to prevent divergence.',
          'To calculate classification precision percentage.',
          'To convert floating point matrix values into 8-bit integers.',
          'To compute matrix determinant.',
        ],
        answer: 0,
        correctAnswer: 0,
        explanation: 'Gradient norm clipping computes the Frobenius norm of parameter gradients and scales them down when they exceed maximum bounds.',
        type: 'conceptual',
      },
    ];
  }

  // 3. Implement Loss Function in NumPy
  if (mId === 'numpy-loss-functions' || ctx.title.toLowerCase().includes('numpy') || ctx.title.toLowerCase().includes('loss')) {
    return [
      {
        questionId: 'q1',
        id: 'q1',
        missionId: 'numpy-loss-functions',
        concept: 'Binary Cross-Entropy Stability',
        difficulty: ctx.difficulty,
        question: 'When implementing Binary Cross-Entropy loss in NumPy `L = -y*log(p) - (1-y)*log(1-p)`, why MUST predictions `p` be clipped with `np.clip(p, 1e-15, 1 - 1e-15)`?',
        options: [
          'To prevent `np.log(0)` from evaluating to `-inf`, which produces `NaN` in total loss calculations.',
          'To round floating point values to integers.',
          'To speed up CPU matrix multiplication by 10x.',
          'To convert probabilities into one-hot binary vectors.',
        ],
        answer: 0,
        correctAnswer: 0,
        explanation: 'If `p` contains 0.0 or 1.0, `np.log(0)` yields `-inf`, resulting in `NaN` loss values. Clipping bounds predictions safely inside (0, 1).',
        type: 'debugging',
      },
      {
        questionId: 'q2',
        id: 'q2',
        missionId: 'numpy-loss-functions',
        concept: 'Mean Squared Error Vectorization',
        difficulty: ctx.difficulty,
        question: 'Which one-line NumPy expression correctly computes Mean Squared Error (MSE) across batched predictions `y_pred` and targets `y_true`?',
        options: [
          'np.mean((y_pred - y_true) ** 2)',
          'np.sum(y_pred - y_true) / 2',
          'np.dot(y_pred, y_true)',
          'np.abs(y_pred - y_true).max()',
        ],
        answer: 0,
        correctAnswer: 0,
        explanation: 'Vectorized MSE subtracts arrays elementwise, squares the differences using `** 2`, and computes total mean using `np.mean()`.',
        type: 'code',
      },
      {
        questionId: 'q3',
        id: 'q3',
        missionId: 'numpy-loss-functions',
        concept: 'Categorical Cross Entropy NumPy Axis',
        difficulty: ctx.difficulty,
        question: 'For a batch of shape (N, C) containing probabilities `P` and one-hot labels `Y`, how is average loss computed in NumPy?',
        options: [
          '-np.mean(np.sum(Y * np.log(P), axis=1))',
          '-np.sum(Y * P)',
          'np.max(Y - P, axis=0)',
          'np.std(P) / N',
        ],
        answer: 0,
        correctAnswer: 0,
        explanation: 'Summing across class axis (`axis=1`) isolates the target class log-probability per sample, then `np.mean()` averages across batch `N`.',
        type: 'numerical',
      },
      {
        questionId: 'q4',
        id: 'q4',
        missionId: 'numpy-loss-functions',
        concept: 'Softmax + Cross Entropy Gradient',
        difficulty: ctx.difficulty,
        question: 'What is the remarkably simple analytical gradient expression `dL/dz` for Softmax probabilities `P` combined with Categorical Cross Entropy targets `Y`?',
        options: [
          'dL/dz = P - Y',
          'dL/dz = P * (1 - Y)',
          'dL/dz = log(P) / Y',
          'dL/dz = P^2 - Y^2',
        ],
        answer: 0,
        correctAnswer: 0,
        explanation: 'Combining Softmax with Cross Entropy simplifies the gradient w.r.t input logits `z` to `P - Y`, enabling efficient vector update computation.',
        type: 'conceptual',
      },
      {
        questionId: 'q5',
        id: 'q5',
        missionId: 'numpy-loss-functions',
        concept: 'NumPy Broadcasting Bug',
        difficulty: ctx.difficulty,
        question: 'Debug bug: `y_pred` has shape (32,) and `y_true` has shape (32, 1). Why does `(y_pred - y_true)**2` produce a matrix of shape (32, 32) instead of a vector?',
        options: [
          'NumPy broadcasting auto-expands 1D (32,) and 2D (32, 1) to form an outer 32x32 grid. Fix: call `y_true.squeeze()` or `y_pred.reshape(-1, 1)`.',
          'NumPy does not support 1D array subtraction.',
          'The array data types mismatch.',
          '32 is not a power of 2.',
        ],
        answer: 0,
        correctAnswer: 0,
        explanation: 'Broadcasting pairs 1D (32,) with 2D (32, 1) into a 32x32 grid. Reshaping array shapes to align dimensions resolves this common bug.',
        type: 'debugging',
      },
      {
        questionId: 'q6',
        id: 'q6',
        missionId: 'numpy-loss-functions',
        concept: 'L2 Regularization Weight Penalty',
        difficulty: ctx.difficulty,
        question: 'How is L2 weight regularization added to a base loss function `L_base` in NumPy for weight matrices `W1` and `W2`?',
        options: [
          'L_total = L_base + 0.5 * reg_lambda * (np.sum(W1**2) + np.sum(W2**2))',
          'L_total = L_base * reg_lambda * np.max(W1)',
          'L_total = L_base - reg_lambda * np.std(W2)',
          'L_total = L_base / (1 + reg_lambda)',
        ],
        answer: 0,
        correctAnswer: 0,
        explanation: 'L2 regularization adds half the sum of squared weights multiplied by `reg_lambda`, heavily penalizing large weight values.',
        type: 'code',
      },
      {
        questionId: 'q7',
        id: 'q7',
        missionId: 'numpy-loss-functions',
        concept: 'NumPy Log-Sum-Exp Trick',
        difficulty: ctx.difficulty,
        question: 'Why is `log(sum(exp(x)))` computed using the Log-Sum-Exp trick `max(x) + log(sum(exp(x - max(x))))` in NumPy Softmax/Loss functions?',
        options: [
          'To prevent numerical overflow (`exp(1000) -> inf`) when exponentiating large logit numbers.',
          'To invert matrix signs.',
          'To convert float arrays to integers.',
          'To compute variance in O(1) time.',
        ],
        answer: 0,
        correctAnswer: 0,
        explanation: 'Subtracting `max(x)` before exponentiation guarantees all `exp()` terms stay <= 1.0, eliminating numeric overflow crashes.',
        type: 'conceptual',
      },
      {
        questionId: 'q8',
        id: 'q8',
        missionId: 'numpy-loss-functions',
        concept: 'Vectorization Performance',
        difficulty: ctx.difficulty,
        question: 'Why is a vectorized NumPy loss calculation ~100x faster than an explicit Python `for` loop over 100,000 samples?',
        options: [
          'NumPy delegates array calculations to contiguous C memory buffers using SIMD CPU vector instructions.',
          'Python loops check for GPU availability on every iteration.',
          'NumPy skips loss evaluation for negative numbers.',
          'Python loops run in synchronous single-bit mode.',
        ],
        answer: 0,
        correctAnswer: 0,
        explanation: 'Vectorized NumPy executes operations in C with memory contiguity and SIMD register instructions, bypassing Python interpreter loop overhead.',
        type: 'mcq',
      },
      {
        questionId: 'q9',
        id: 'q9',
        missionId: 'numpy-loss-functions',
        concept: 'Huber Loss Robustness',
        difficulty: ctx.difficulty,
        question: 'What advantage does Huber Loss have over Mean Squared Error (MSE) when training on datasets containing extreme outliers in NumPy?',
        options: [
          'Huber loss transitions from quadratic error for small errors to linear error for large errors, preventing outliers from dominating gradients.',
          'Huber loss produces non-zero gradients for zero error.',
          'Huber loss requires zero hyperparameter configuration.',
          'Huber loss guarantees 100% classification accuracy.',
        ],
        answer: 0,
        correctAnswer: 0,
        explanation: 'Linear scaling for large errors prevents extreme outlier sample errors from generating massive, disruptive gradient spikes.',
        type: 'scenario',
      },
      {
        questionId: 'q10',
        id: 'q10',
        missionId: 'numpy-loss-functions',
        concept: 'Gradient Checking with Finite Differences',
        difficulty: ctx.difficulty,
        question: 'How does finite difference gradient checking verify custom NumPy loss gradient function `compute_grad(W)`?',
        options: [
          'By checking if `(loss(W + h) - loss(W - h)) / (2 * h)` matches `compute_grad(W)` within a small relative tolerance (e.g. 1e-7).',
          'By training the network for 100 epochs and monitoring accuracy.',
          'By checking if weights are symmetric.',
          'By verifying if matrix determinant is non-zero.',
        ],
        answer: 0,
        correctAnswer: 0,
        explanation: 'Centered finite difference formula provides a numerical baseline derivative to verify analytical gradient code implementations.',
        type: 'debugging',
      },
    ];
  }

  // 4. HashMap & Hashing
  return [
    {
      questionId: 'q1',
      id: 'q1',
      missionId: 'hashmap-and-hashing',
      concept: 'Time Complexity',
      difficulty: ctx.difficulty,
      question: 'What is the average time complexity of key lookup, insertion, and deletion in a well-implemented HashMap?',
      options: [
        'O(1) constant average time complexity.',
        'O(N) linear time complexity.',
        'O(log N) logarithmic time complexity.',
        'O(N^2) quadratic time complexity.',
      ],
      answer: 0,
      correctAnswer: 0,
      explanation: 'A uniform hash function distributes keys across bucket array indices, yielding average O(1) lookup, insertion, and deletion.',
      type: 'conceptual',
    },
    {
      questionId: 'q2',
      id: 'q2',
      missionId: 'hashmap-and-hashing',
      concept: 'Hash Collisions',
      difficulty: ctx.difficulty,
      question: 'What occurs when two distinct keys (e.g. "keyA" and "keyB") compute to the exact same hash table bucket index?',
      options: [
        'A Hash Collision.',
        'A Memory Overflow Exception.',
        'An Invalidation Error.',
        'A Deadlock Condition.',
      ],
      answer: 0,
      correctAnswer: 0,
      explanation: 'Hash collisions are natural due to the Pigeonhole Principle when mapping infinite key strings into finite array bucket capacity.',
      type: 'mcq',
    },
    {
      questionId: 'q3',
      id: 'q3',
      missionId: 'hashmap-and-hashing',
      concept: 'Separate Chaining',
      difficulty: ctx.difficulty,
      question: 'How does Separate Chaining resolve hash collisions when multiple keys land in the same bucket?',
      options: [
        'By maintaining a linked list or dynamic bucket array at each bucket location to hold colliding key-value entries.',
        'By overwriting old keys with newly inserted keys.',
        'By discarding the entire hash table and doubling array size instantly.',
        'By placing colliding items into a secondary stack.',
      ],
      answer: 0,
      correctAnswer: 0,
      explanation: 'Separate Chaining attaches auxiliary data structures (linked lists or self-balancing BSTs) to bucket slots to store colliding keys.',
      type: 'conceptual',
    },
    {
      questionId: 'q4',
      id: 'q4',
      missionId: 'hashmap-and-hashing',
      concept: 'Open Addressing Linear Probing',
      difficulty: ctx.difficulty,
      question: 'In Open Addressing with Linear Probing, what step is taken when a collision occurs at bucket index `i`?',
      options: [
        'Sequentially probe consecutive slots `(i + 1) % capacity, (i + 2) % capacity` until an available empty slot is found.',
        'Allocate a new heap array of size N + 1.',
        'Multiply the hash code by 31.',
        'Throw a DuplicateKeyException.',
      ],
      answer: 0,
      correctAnswer: 0,
      explanation: 'Linear Probing inspects adjacent array slots sequentially to store colliding entries directly within the main bucket array.',
      type: 'scenario',
    },
    {
      questionId: 'q5',
      id: 'q5',
      missionId: 'hashmap-and-hashing',
      concept: 'Load Factor & Rehashing',
      difficulty: ctx.difficulty,
      question: 'What is the HashMap Load Factor defined as, and what action does exceeding its threshold (e.g. 0.75) trigger?',
      options: [
        'Ratio N / K (stored items / bucket capacity). Exceeding threshold triggers table resizing (doubling) and entry rehashing.',
        'Ratio of key length to value length. Exceeding threshold triggers string compression.',
        'Percentage of deleted keys. Exceeding threshold triggers garbage collection.',
        'Ratio of CPU time to RAM size. Exceeding threshold pauses threads.',
      ],
      answer: 0,
      correctAnswer: 0,
      explanation: 'Load Factor alpha = N / K measures fill density. When alpha > 0.75, collision frequency increases, prompting rehashing into a larger table.',
      type: 'numerical',
    },
    {
      questionId: 'q6',
      id: 'q6',
      missionId: 'hashmap-and-hashing',
      concept: 'Mutable Key Pitfall',
      difficulty: ctx.difficulty,
      question: 'Why is modifying an object\'s fields AFTER storing it as a key in a HashMap considered a critical bug?',
      options: [
        'The object\'s computed hash code changes, making it impossible to locate the key in its original bucket during lookups.',
        'The HashMap automatically deletes modified key values.',
        'Mutable objects increase array capacity without permission.',
        'It causes integer arithmetic overflow.',
      ],
      answer: 0,
      correctAnswer: 0,
      explanation: 'Because bucket location depends on `hashCode()`, mutating key state shifts the target index, causing `get()` calls to fail.',
      type: 'debugging',
    },
    {
      questionId: 'q7',
      id: 'q7',
      missionId: 'hashmap-and-hashing',
      concept: 'Worst-Case Time Complexity',
      difficulty: ctx.difficulty,
      question: 'Under what degenerate scenario does HashMap lookup time complexity degrade from average O(1) to worst-case O(N)?',
      options: [
        'When a poor or malicious hash function causes ALL N keys to collapse into the exact same bucket.',
        'When array capacity is a prime number.',
        'When looking up keys using string identifiers.',
        'When the HashMap contains more than 1,000 items.',
      ],
      answer: 0,
      correctAnswer: 0,
      explanation: 'If all keys hash to the same bucket, lookup degenerates to searching a linear list of length N, resulting in O(N) worst-case time.',
      type: 'conceptual',
    },
    {
      questionId: 'q8',
      id: 'q8',
      missionId: 'hashmap-and-hashing',
      concept: 'Amortized Complexity',
      difficulty: ctx.difficulty,
      question: 'Although HashMap resizing requires O(N) time to rehash all elements, why is insertion still considered O(1) amortized time?',
      options: [
        'Resizing occurs infrequently (doubling capacity each time), distributing the O(N) cost over N cheap O(1) insertion operations.',
        'Resizing executes on secondary hardware threads asynchronously.',
        'The O(N) cost is subtracted from garbage collection memory.',
        'Rehashing skips keys that were inserted earlier.',
      ],
      answer: 0,
      correctAnswer: 0,
      explanation: 'Because doubling capacity happens exponentially less often as table grows, the average cost per insertion remains O(1) amortized.',
      type: 'mcq',
    },
    {
      questionId: 'q9',
      id: 'q9',
      missionId: 'hashmap-and-hashing',
      concept: 'HashDoS Security Vulnerability',
      difficulty: ctx.difficulty,
      question: 'What is a HashDoS (Hash Denial of Service) attack against web servers relying on default HashMaps for HTTP parameter parsing?',
      options: [
        'An attacker sends engineered HTTP request keys that deliberately collide in the same bucket, spiking server CPU to O(N^2) parsing time.',
        'An attacker steals secret encryption keys from hash bucket headers.',
        'An attacker fills server RAM with zero-byte string buffers.',
        'An attacker corrupts database SQL index nodes.',
      ],
      answer: 0,
      correctAnswer: 0,
      explanation: 'Crafting colliding request keys forces web servers into worst-case O(N) lookup loops, consuming 100% CPU capacity.',
      type: 'scenario',
    },
    {
      questionId: 'q10',
      id: 'q10',
      missionId: 'hashmap-and-hashing',
      concept: 'Two-Sum Problem Application',
      difficulty: ctx.difficulty,
      question: 'How does using a HashMap optimize the classic Two-Sum algorithm from O(N^2) brute force to O(N) linear time complexity?',
      options: [
        'By storing visited array elements in the map and checking if complement `target - num` exists in O(1) lookup time per element.',
        'By sorting the input array using hash values in O(1) time.',
        'By computing matrix determinants of input numbers.',
        'By converting numbers into binary bitmasks.',
      ],
      answer: 0,
      correctAnswer: 0,
      explanation: 'HashMap enables instant O(1) checking of required complement values `(target - num)` while iterating through the array once in O(N).',
      type: 'code',
    },
  ];
}

/**
 * Query Gemini AI for context-aware AI Tutor guidance
 */
export async function askGeminiTutor(
  prompt: string,
  context?: { conceptName?: string; mastery?: number; weakPoints?: string[] }
): Promise<string> {
  if (ai) {
    try {
      const systemContext = `You are NOVA AI, an intelligent learning assistant embedded in the NOVA Learning OS.
User Context:
- Target Role: AI/ML Engineer
- Active Concept: ${context?.conceptName || 'General Learning'}
- Current Mastery: ${context?.mastery || 72}%
- Weak Areas: ${context?.weakPoints?.join(', ') || 'None identified'}

Respond concisely, authoritatively, and with clear formatting (markdown, bullet points, or code snippets when helpful).`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `${systemContext}\n\nUser Question: ${prompt}`,
      });

      return response.text || 'I analyzed your question against your learning telemetry. Let me know if you would like me to generate a practice drill or visual diagram for this node!';
    } catch (err) {
      console.warn('Gemini Tutor query notice:', err);
    }
  }

  return `Here is NOVA AI's explanation regarding "${prompt}": In computational graphs, parameter updates rely on directional gradient derivatives. Practicing 15 minutes of matrix calculus will raise your retention by ~12%.`;
}

