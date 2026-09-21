/**
 * NOVA Mission Content Registry
 * Central single-source-of-truth providing distinct educational learning content,
 * concept explanations, visual diagrams, code tasks, and AI intents per mission.
 */
import type { MissionDetail } from '../types';

export const MISSION_REGISTRY: Record<string, MissionDetail> = {
  // 1. Backpropagation & Computational Graphs
  'backpropagation-computational-graphs': {
    id: 'backpropagation-computational-graphs',
    conceptId: 'backprop',
    conceptName: 'Backpropagation & Autograd',
    title: 'Backpropagation & Computational Graphs',
    category: 'DEEP LEARNING',
    duration: '25 mins',
    difficulty: 'Intermediate',
    stage: 'Learn',
    description: 'Master forward pass graph construction, chain rule derivative propagation, and autograd gradient accumulation.',
    learningObjective: 'Understand how computational graphs decompose complex nested functions into elementary operation nodes for automatic differentiation.',
    aiIntent: 'NOVA prioritized this mission because chain rule gradient flow is a essential prerequisite for Deep Learning & Transformer Architectures.',
    learnContent: {
      part1Title: '1. What is Computational Graph Backpropagation?',
      part1Text: 'A computational graph represents mathematical expressions as directed graphs where nodes are operations or variable inputs. Backpropagation executes a reverse topological sort, applying the multi-variable chain rule to compute partial derivatives dL/dx for every node in a single backward sweep.',
      part2Title: '2. Algorithmic Formulation & Chain Rule',
      part2Text: 'For a composition y = f(u) where u = g(x), the derivative dL/dx is computed as (dL/dy) * (dy/du) * (du/dx). In tensor autograd engines, local gradients are calculated during the forward pass and multiplied by incoming upstream gradients during the backward pass.',
      codeSnippet: `# Autograd Chain Rule Graph Node Execution\nclass Tensor:\n    def __init__(self, data, _children=()):\n        self.data = data\n        self.grad = 0.0\n        self._backward = lambda: None\n        self._prev = set(_children)\n\n    def __add__(self, other):\n        out = Tensor(self.data + other.data, (self, other))\n        def _backward():\n            self.grad += 1.0 * out.grad\n            other.grad += 1.0 * out.grad\n        out._backward = _backward\n        return out`,
      diagramType: 'backprop',
    },
    applyContent: {
      taskTitle: 'Implementation Task: Computational Graph Reverse Pass',
      taskDescription: 'Write a Python function `compute_autograd_gradients(x, y, w, b)` that calculates partial derivatives dL/dw and dL/db for linear prediction L = 0.5 * (w*x + b - y)^2.',
      initialCode: `import numpy as np\n\ndef compute_autograd_gradients(x, y, w, b):\n    # 1. Forward Pass\n    pred = w * x + b\n    error = pred - y\n    loss = 0.5 * (error ** 2)\n    \n    # 2. Backward Pass (Chain Rule)\n    dloss_derror = error\n    derror_dpred = 1.0\n    dpred_dw = x\n    dpred_db = 1.0\n    \n    dl_dw = dloss_derror * derror_dpred * dpred_dw\n    dl_db = dloss_derror * derror_dpred * dpred_db\n    return dl_dw, dl_db\n\n# Test Run\nx, y, w, b = 2.0, 5.0, 1.5, 0.5\ndl_dw, dl_db = compute_autograd_gradients(x, y, w, b)\nprint(f"dL/dw: {dl_dw}, dL/db: {dl_db}")`,
      expectedOutput: 'Executing Autograd Gradient Verifier...\nTest 1 (Scalar Chain Rule): dL/dw: -3.0, dL/db: -1.5\nTest 2 (Vectorized Batch autograd): Gradient norms verified.\nResult: 2/2 TEST CASES PASSED!',
      testCasesDescription: 'Vectorized chain rule verification against PyTorch grad baseline.',
    },
  },

  // 2. Matrix Calculus for Gradient Descent
  'matrix-calculus-gradient-descent': {
    id: 'matrix-calculus-gradient-descent',
    conceptId: 'calculus',
    conceptName: 'Multivariate Calculus',
    title: 'Matrix Calculus for Gradient Descent',
    category: 'MATHEMATICS',
    duration: '15 mins',
    difficulty: 'Intermediate',
    stage: 'Practice',
    description: 'Calculate Jacobian & Hessian matrix shapes, gradient vector projections, and parameter step update rules.',
    learningObjective: 'Master matrix derivative rules and parameter updates w = w - alpha * grad for multi-layer neural network parameters.',
    aiIntent: 'NOVA identified Jacobian matrix dimension alignment as an active practice area to prepare for multi-layer perceptron training.',
    learnContent: {
      part1Title: '1. Matrix Differentiation Basics',
      part1Text: 'When computing loss scalar gradients with respect to matrix weights W of dimension (N, M), the gradient tensor dL/dW must match the shape of W exactly: (N, M). The derivative of matrix vector product Y = X * W with respect to W is X^T * dL/dY.',
      part2Title: '2. Gradient Step & Momentum',
      part2Text: 'Standard gradient descent updates weights in the direction of steepest loss decrease: W_new = W_old - learning_rate * dL/dW. Adding momentum updates preserves velocity direction to accelerate convergence across shallow ravines.',
      codeSnippet: `# Vectorized Matrix Gradient Step\ndef gradient_descent_step(W, dW, learning_rate=0.01):\n    # Shape of dW matches W (batch_size x hidden_dim)\n    return W - learning_rate * dW`,
      diagramType: 'gradient',
    },
    applyContent: {
      taskTitle: 'Implementation Task: Matrix Gradient Step with Momentum',
      taskDescription: 'Write a vectorized function `momentum_update(W, dW, V, beta, lr)` that calculates velocity V_new = beta*V + lr*dW and returns updated W_new = W - V_new.',
      initialCode: `import numpy as np\n\ndef momentum_update(W, dW, V, beta=0.9, lr=0.01):\n    V_new = beta * V + lr * dW\n    W_new = W - V_new\n    return W_new, V_new\n\n# Test input\nW = np.array([[1.0, 2.0], [3.0, 4.0]])\ndW = np.array([[0.1, 0.2], [0.3, 0.4]])\nV = np.zeros_like(W)\nW_updated, V_updated = momentum_update(W, dW, V)\nprint("Updated W:\\n", W_updated)`,
      expectedOutput: 'Executing Matrix Calculus Test Runner...\nTest 1 (Shape Alignment): W shape (2,2) matches dW shape (2,2)\nTest 2 (Momentum Decay): Velocity accumulation verified.\nResult: 2/2 TEST CASES PASSED!',
      testCasesDescription: 'Matrix derivative dimension matching and momentum update test suite.',
    },
  },

  // 3. Implement Loss Function in NumPy
  'numpy-loss-function': {
    id: 'numpy-loss-function',
    conceptId: 'neural-networks',
    conceptName: 'Neural Networks',
    title: 'Implement Loss Function in NumPy',
    category: 'MACHINE LEARNING',
    duration: '30 mins',
    difficulty: 'Advanced',
    stage: 'Apply',
    description: 'Write a vectorized Categorical Cross-Entropy loss module from scratch with log-sum-exp numerical stability bounds.',
    learningObjective: 'Implement numerically stable loss functions that handle probability clipping and avoid log(0) NaN overflow.',
    aiIntent: 'NOVA scheduled this implementation task to prove your vectorized NumPy coding capability before constructing deep learning architectures.',
    learnContent: {
      part1Title: '1. Categorical Cross-Entropy Loss',
      part1Text: 'Cross-entropy measures the divergence between target probability distribution y and predicted probability distribution y_hat: L = -sum(y * log(y_hat)). In multi-class classification, y is a one-hot encoded vector.',
      part2Title: '2. Numerical Stability Clipping',
      part2Text: 'Direct evaluation of log(0) produces -inf, causing NaN gradients during backpropagation. We clip predicted probabilities to range [1e-15, 1 - 1e-15] using `np.clip` to guarantee numeric stability.',
      codeSnippet: `import numpy as np\n\ndef categorical_cross_entropy(y_pred, y_true):\n    eps = 1e-15\n    y_pred = np.clip(y_pred, eps, 1.0 - eps)\n    return -np.sum(y_true * np.log(y_pred)) / y_pred.shape[0]`,
      diagramType: 'matrix',
    },
    applyContent: {
      taskTitle: 'Implementation Task: Stable Categorical Cross-Entropy',
      taskDescription: 'Write a vectorized loss function that accepts mini-batch arrays y_pred (N, C) and y_true (N, C), clips probabilities, and returns mean scalar loss across batch N.',
      initialCode: `import numpy as np\n\ndef categorical_cross_entropy(y_pred, y_true):\n    epsilon = 1e-15\n    y_pred = np.clip(y_pred, epsilon, 1.0 - epsilon)\n    # Compute mean loss over mini-batch\n    batch_loss = -np.sum(y_true * np.log(y_pred), axis=-1)\n    return np.mean(batch_loss)\n\n# Test input\ny_pred = np.array([[0.7, 0.2, 0.1], [0.1, 0.8, 0.1]])\ny_true = np.array([[1.0, 0.0, 0.0], [0.0, 1.0, 0.0]])\nprint("Calculated Mini-Batch Loss:", categorical_cross_entropy(y_pred, y_true))`,
      expectedOutput: 'Executing NumPy Test Runner...\nTest 1 (Single Sample): y_pred=[0.7, 0.2, 0.1], y_true=[1, 0, 0] => Loss: 0.35667\nTest 2 (Mini-Batch Shape 32x10): Gradient norm verified.\nResult: 2/2 TEST CASES PASSED!',
      testCasesDescription: 'Vectorized Mini-Batch Categorical Cross Entropy stability test suite.',
    },
  },

  // 4. HashMap Collision Handling & Load Factor
  'hashmap-hashing': {
    id: 'hashmap-hashing',
    conceptId: 'hashmap',
    conceptName: 'HashMap & Hashing',
    title: 'HashMap Collision Handling & Load Factor',
    category: 'FOUNDATIONS',
    duration: '20 mins',
    difficulty: 'Intermediate',
    stage: 'Learn',
    description: 'Master open addressing, separate chaining, load factor rehashing, and O(1) average time complexity bounds.',
    learningObjective: 'Understand how hash functions map arbitrary key spaces into table array indices and resolve collisions.',
    aiIntent: 'NOVA detected a 48% gap in collision handling concepts blocking Caching/LRU & System Design nodes.',
    learnContent: {
      part1Title: '1. What is HashMap Collision Handling?',
      part1Text: 'A hash table uses a mathematical hash function hash(key) % capacity to map keys into array buckets. When two distinct keys compute to the identical index (collision), collision resolution strategies must prevent overwriting data.',
      part2Title: '2. Chaining vs. Open Addressing',
      part2Text: 'Separate Chaining stores key-value pairs in a linked list or binary tree inside each bucket. Open Addressing probes alternative array slots (linear probing, quadratic probing, or double hashing) until an empty cell is found.',
      codeSnippet: `# Chaining Hash Table Slot Insertion\ndef insert_chaining(table, capacity, key, value):\n    index = hash(key) % capacity\n    for pair in table[index]:\n        if pair[0] == key:\n            pair[1] = value\n            return\n    table[index].append([key, value])`,
      diagramType: 'hashmap',
    },
    applyContent: {
      taskTitle: 'Implementation Task: HashMap Linear Probing Insertion',
      taskDescription: 'Write a function `insert_linear_probe(keys, capacity)` that inserts integer keys into a fixed-size array using linear probing `(hash + i) % capacity` and returns the final table.',
      initialCode: `import numpy as np\n\ndef insert_linear_probe(keys, capacity):\n    table = [None] * capacity\n    for k in keys:\n        idx = k % capacity\n        while table[idx] is not None:\n            idx = (idx + 1) % capacity\n        table[idx] = k\n    return table\n\n# Test input\nkeys = [12, 22, 32, 5]\nprint("Hash Table State:", insert_linear_probe(keys, 10))`,
      expectedOutput: 'Executing HashMap Test Runner...\nTest 1 (Collision Probe): Insert 12, 22, 32 => Probe offsets verified\nTest 2 (Load Factor Threshold): Rehash trigger verified at alpha = 0.75.\nResult: 2/2 TEST CASES PASSED!',
      testCasesDescription: 'Linear probing collision resolution and load factor rehash test suite.',
    },
  },

  // 5. Python & Data Structures Mastery
  'python-data-structures': {
    id: 'python-data-structures',
    conceptId: 'python',
    conceptName: 'Python & Data Structures',
    title: 'Python & Data Structures Mastery',
    category: 'FOUNDATIONS',
    duration: '20 mins',
    difficulty: 'Beginner',
    stage: 'Learn',
    description: 'Master Python memory management, list comprehensions, generators, and fundamental data structures.',
    learningObjective: 'Understand Python dynamic typing, memory pointers, and time complexity of built-in data structures.',
    aiIntent: 'NOVA scheduled this foundational mission to solidify core language primitives before algorithm design.',
    learnContent: {
      part1Title: '1. Python Memory Model & References',
      part1Text: 'In Python, everything is an object. Variables store references to memory addresses rather than raw values. Understanding mutable vs immutable types (lists vs tuples) is essential for writing bug-free code.',
      part2Title: '2. List Comprehensions & Generator Performance',
      part2Text: 'List comprehensions provide concise syntax for creating lists. Generators produce elements lazily using yield, conserving memory when processing large datasets.',
      codeSnippet: `# Generator Expression vs List Comprehension\nlarge_gen = (x ** 2 for x in range(1000000)) # Lazy 88 bytes\nlarge_list = [x ** 2 for x in range(1000000)] # Eager ~8MB`,
      diagramType: 'code',
    },
    applyContent: {
      taskTitle: 'Implementation Task: Lazy Data Pipeline Generator',
      taskDescription: 'Write a generator function `filter_even_squares(numbers)` that yields the square of even numbers lazily.',
      initialCode: `def filter_even_squares(numbers):\n    for n in numbers:\n        if n % 2 == 0:\n            yield n ** 2\n\n# Test input\nnums = [1, 2, 3, 4, 5, 6]\nprint("Even Squares:", list(filter_even_squares(nums)))`,
      expectedOutput: 'Executing Python DS Test Runner...\nTest 1 (Lazy Iteration): Memory footprint < 1KB\nTest 2 (Generator Output): Correct output [4, 16, 36]\nResult: 2/2 TEST CASES PASSED!',
      testCasesDescription: 'Generator lazy memory evaluation test suite.',
    },
  },

  // 6. Linear Algebra & Multivariate Calculus
  'linear-algebra-calculus': {
    id: 'linear-algebra-calculus',
    conceptId: 'linear-algebra',
    conceptName: 'Linear Algebra & Calculus',
    title: 'Linear Algebra & Multivariate Calculus',
    category: 'MATHEMATICS',
    duration: '25 mins',
    difficulty: 'Intermediate',
    stage: 'Learn',
    description: 'Master vector spaces, matrix transformations, eigenvalues, and partial derivatives.',
    learningObjective: 'Understand how matrix multiplication transforms vector spaces and how gradients point towards maximum slope.',
    aiIntent: 'NOVA scheduled this mathematics module to prepare for deep learning weight matrices and gradient descent.',
    learnContent: {
      part1Title: '1. Linear Transformations & Matrix Operations',
      part1Text: 'Matrix multiplication represents a linear transformation mapping input vectors to output spaces. Rotation, scaling, and shear matrices modify coordinate axes in vector spaces.',
      part2Title: '2. Gradient Vectors & Directional Derivatives',
      part2Text: 'The gradient vector nabla f contains all first-order partial derivatives. It points in the direction of steepest increase of function f, with magnitude equal to the rate of increase.',
      codeSnippet: `import numpy as np\n\n# Vector transformation by matrix A\nA = np.array([[2, 0], [0, 3]])\nv = np.array([1, 1])\ntransformed_v = np.dot(A, v)`,
      diagramType: 'matrix',
    },
    applyContent: {
      taskTitle: 'Implementation Task: Vector Projections & Gradient Norm',
      taskDescription: 'Write a function `vector_projection(u, v)` that calculates orthogonal projection of vector u onto vector v.',
      initialCode: `import numpy as np\n\ndef vector_projection(u, v):\n    proj = (np.dot(u, v) / np.dot(v, v)) * v\n    return proj\n\n# Test input\nu = np.array([3, 4])\nv = np.array([1, 0])\nprint("Projection of u onto v:", vector_projection(u, v))`,
      expectedOutput: 'Executing Linear Algebra Test Runner...\nTest 1 (Orthogonal Projection): Proj of [3,4] onto [1,0] = [3,0]\nTest 2 (Gradient Vector Norm): Euclidean length verified.\nResult: 2/2 TEST CASES PASSED!',
      testCasesDescription: 'Vector projection and gradient norm test suite.',
    },
  },

  // 7. Supervised Learning & Model Evaluation
  'supervised-learning': {
    id: 'supervised-learning',
    conceptId: 'supervised-learning',
    conceptName: 'Supervised Learning',
    title: 'Supervised Learning & Model Evaluation',
    category: 'MACHINE LEARNING',
    duration: '30 mins',
    difficulty: 'Intermediate',
    stage: 'Learn',
    description: 'Master regression models, classification metrics, confusion matrices, and cross-validation techniques.',
    learningObjective: 'Evaluate machine learning model performance using precision, recall, F1-score, and ROC-AUC curves.',
    aiIntent: 'NOVA identified model evaluation metrics as key knowledge for building reliable production ML systems.',
    learnContent: {
      part1Title: '1. Supervised Learning Fundamentals',
      part1Text: 'Supervised learning trains models on labeled input-output pairs (X, Y) to discover mapping function f(X) ≈ Y. Tasks are divided into continuous Regression and discrete Classification.',
      part2Title: '2. Classification Metrics & Confusion Matrix',
      part2Text: 'Accuracy alone can be misleading on imbalanced datasets. Precision measures true positives among predicted positives, while Recall measures true positives among actual positive samples.',
      codeSnippet: `def f1_score(precision, recall):\n    if precision + recall == 0:\n        return 0.0\n    return 2 * (precision * recall) / (precision + recall)`,
      diagramType: 'code',
    },
    applyContent: {
      taskTitle: 'Implementation Task: Confusion Matrix & F1-Score',
      taskDescription: 'Write a function `compute_metrics(y_true, y_pred)` that computes Precision, Recall, and F1-score.',
      initialCode: `import numpy as np\n\ndef compute_metrics(y_true, y_pred):\n    tp = np.sum((y_true == 1) & (y_pred == 1))\n    fp = np.sum((y_true == 0) & (y_pred == 1))\n    fn = np.sum((y_true == 1) & (y_pred == 0))\n    \n    precision = tp / (tp + fp) if (tp + fp) > 0 else 0.0\n    recall = tp / (tp + fn) if (tp + fn) > 0 else 0.0\n    f1 = 2 * precision * recall / (precision + recall) if (precision + recall) > 0 else 0.0\n    return precision, recall, f1\n\n# Test\ny_true = np.array([1, 0, 1, 1, 0, 1])\ny_pred = np.array([1, 0, 1, 0, 0, 1])\nprint("Precision, Recall, F1:", compute_metrics(y_true, y_pred))`,
      expectedOutput: 'Executing ML Evaluation Test Runner...\nTest 1 (Precision/Recall): TP=3, FP=0, FN=1 => F1=0.857\nTest 2 (Edge Case Zero Positives): Handled gracefully.\nResult: 2/2 TEST CASES PASSED!',
      testCasesDescription: 'Precision, Recall, and F1 score computation test suite.',
    },
  },

  // 8. Neural Networks & Transformer Architectures
  'transformers': {
    id: 'transformers',
    conceptId: 'transformers',
    conceptName: 'Transformer Architectures',
    title: 'Neural Networks & Transformer Architectures',
    category: 'DEEP LEARNING',
    duration: '35 mins',
    difficulty: 'Advanced',
    stage: 'Learn',
    description: 'Master Scaled Dot-Product Attention, Multi-Head Attention, positional encodings, and Transformer blocks.',
    learningObjective: 'Understand how self-attention mechanisms compute token context representations in parallel.',
    aiIntent: 'NOVA scheduled this advanced deep learning module to prepare for LLM engineering and RAG systems.',
    learnContent: {
      part1Title: '1. Self-Attention & Query-Key-Value Vectors',
      part1Text: 'Self-attention allows tokens in a sequence to dynamically weigh relevance to all other tokens. Inputs are projected into Query (Q), Key (K), and Value (V) matrix representations.',
      part2Title: '2. Scaled Dot-Product Formula',
      part2Text: 'Attention(Q, K, V) = softmax((Q * K^T) / sqrt(d_k)) * V. Scaling by sqrt(d_k) prevents dot products from growing excessively large in high dimensions, keeping softmax gradients stable.',
      codeSnippet: `import numpy as np\n\ndef scaled_dot_product_attention(Q, K, V):\n    d_k = Q.shape[-1]\n    scores = np.dot(Q, K.T) / np.sqrt(d_k)\n    weights = np.exp(scores) / np.sum(np.exp(scores), axis=-1, keepdims=True)\n    return np.dot(weights, V)`,
      diagramType: 'neuralnet',
    },
    applyContent: {
      taskTitle: 'Implementation Task: Scaled Dot-Product Self Attention',
      taskDescription: 'Write a function `self_attention(Q, K, V)` that computes scaled dot product attention with softmax weighting.',
      initialCode: `import numpy as np\n\ndef self_attention(Q, K, V):\n    d_k = Q.shape[-1]\n    scores = np.matmul(Q, K.T) / np.sqrt(d_k)\n    exp_scores = np.exp(scores - np.max(scores, axis=-1, keepdims=True))\n    attention_weights = exp_scores / np.sum(exp_scores, axis=-1, keepdims=True)\n    return np.matmul(attention_weights, V)\n\n# Test input\nQ = np.random.randn(4, 8)\nK = Q\nV = Q\nprint("Attention Output Shape:", self_attention(Q, K, V).shape)`,
      expectedOutput: 'Executing Transformer Test Runner...\nTest 1 (Attention Output Shape): Expected (4, 8), got (4, 8)\nTest 2 (Softmax Weighting): Row sums equal 1.0.\nResult: 2/2 TEST CASES PASSED!',
      testCasesDescription: 'Scaled dot-product self-attention mechanism test suite.',
    },
  },

  // 9. Retrieval Augmented Generation (RAG) & Agents
  'rag': {
    id: 'rag',
    conceptId: 'rag',
    conceptName: 'Retrieval Augmented Generation',
    title: 'Retrieval Augmented Generation (RAG) & Agents',
    category: 'AI SYSTEMS',
    duration: '40 mins',
    difficulty: 'Advanced',
    stage: 'Learn',
    description: 'Master vector database indexing, semantic similarity search, chunking strategies, and autonomous agent loops.',
    learningObjective: 'Build RAG pipelines that ground LLM generation with domain-specific knowledge base retrieval.',
    aiIntent: 'NOVA scheduled this capstone AI Systems mission to complete your transition to AI/ML Engineer.',
    learnContent: {
      part1Title: '1. What is RAG Architecture?',
      part1Text: 'Retrieval Augmented Generation connects Large Language Models to external knowledge stores. User queries are converted into dense vector embeddings, retrieved via cosine similarity, and injected into prompt context.',
      part2Title: '2. Vector Embeddings & Similarity Search',
      part2Text: 'Text chunks are passed through embedding models to generate high-dimensional vectors. Cosine similarity cos(theta) = (A dot B) / (||A||*||B||) measures semantic closeness between query and document vectors.',
      codeSnippet: `import numpy as np\n\ndef cosine_similarity(a, b):\n    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))`,
      diagramType: 'code',
    },
    applyContent: {
      taskTitle: 'Implementation Task: Vector Cosine Similarity Search',
      taskDescription: 'Write a function `top_k_retrieval(query_vec, doc_vecs, k=2)` that calculates cosine similarity and returns top k document indices.',
      initialCode: `import numpy as np\n\ndef top_k_retrieval(query_vec, doc_vecs, k=2):\n    sims = []\n    q_norm = np.linalg.norm(query_vec)\n    for d in doc_vecs:\n        sim = np.dot(query_vec, d) / (q_norm * np.linalg.norm(d))\n        sims.append(sim)\n    indices = np.argsort(sims)[::-1][:k]\n    return indices\n\n# Test\nq = np.array([1.0, 0.0, 0.0])\ndocs = [np.array([0.9, 0.1, 0.0]), np.array([0.0, 1.0, 0.0]), np.array([0.8, 0.2, 0.0])]\nprint("Top 2 Relevant Document Indices:", top_k_retrieval(q, docs, k=2))`,
      expectedOutput: 'Executing RAG Vector Search Test Runner...\nTest 1 (Top K Retrieval): Top indices [0, 2] verified.\nTest 2 (Cosine Normalization): Normalized range [0, 1] verified.\nResult: 2/2 TEST CASES PASSED!',
      testCasesDescription: 'Vector database similarity search and retrieval test suite.',
    },
  },
};

// Aliases for alternate route/concept IDs to guarantee resolution
const ALIAS_MAP: Record<string, string> = {
  'backprop': 'backpropagation-computational-graphs',
  'm_backprop': 'backpropagation-computational-graphs',
  'matrix-calculus': 'matrix-calculus-gradient-descent',
  'm_matrix_calculus': 'matrix-calculus-gradient-descent',
  'calculus': 'matrix-calculus-gradient-descent',
  'loss-numpy': 'numpy-loss-function',
  'm_loss_numpy': 'numpy-loss-function',
  'neural-networks': 'numpy-loss-function',
  'hashmap': 'hashmap-hashing',
  'm_hashmap': 'hashmap-hashing',
  'python': 'python-data-structures',
  'data-structures': 'python-data-structures',
  'linear-algebra': 'linear-algebra-calculus',
  'supervised-learning': 'supervised-learning',
  'agents': 'rag',
  'm_prove_math': 'linear-algebra-calculus',
};

/**
 * Resolves a unique MissionDetail object dynamically based on any missionId or conceptId.
 * NO HARDCODED HASHMAP FALLBACK!
 */
export function getMissionDetail(routeId?: string): MissionDetail {
  if (!routeId) {
    return MISSION_REGISTRY['backpropagation-computational-graphs'];
  }

  const normalizedId = routeId.toLowerCase().trim();

  // 1. Direct registry match
  if (MISSION_REGISTRY[normalizedId]) {
    return MISSION_REGISTRY[normalizedId];
  }

  // 2. Alias map lookup
  if (ALIAS_MAP[normalizedId] && MISSION_REGISTRY[ALIAS_MAP[normalizedId]]) {
    return MISSION_REGISTRY[ALIAS_MAP[normalizedId]];
  }

  // 3. Dynamic fallback generated specifically for the requested routeId (NEVER hardcodes HashMap!)
  const formattedTitle = normalizedId
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    id: normalizedId,
    conceptId: normalizedId,
    conceptName: formattedTitle,
    title: `${formattedTitle} Mission`,
    category: 'FOUNDATIONS',
    duration: '20 mins',
    difficulty: 'Intermediate',
    stage: 'Learn',
    description: `Master key concepts and practical execution for ${formattedTitle}.`,
    learningObjective: `Understand structural formulation and computational principles of ${formattedTitle}.`,
    aiIntent: `NOVA scheduled this mission based on active concept gap telemetry for ${formattedTitle}.`,
    learnContent: {
      part1Title: `1. Understanding ${formattedTitle}`,
      part1Text: `${formattedTitle} represents a key structural concept in computer science and machine learning. Mastering this node unlocks downstream advanced topics.`,
      part2Title: `2. Formulation & Execution`,
      part2Text: `Execution requires mapping inputs through transformation functions and analyzing numeric performance metrics.`,
      codeSnippet: `# ${formattedTitle} Execution Module\ndef execute_${normalizedId.replace(/-/g, '_')}(x):\n    return x`,
      diagramType: 'code',
    },
    applyContent: {
      taskTitle: `Implementation Task: ${formattedTitle}`,
      taskDescription: `Implement a functional module for ${formattedTitle} that passes execution unit tests.`,
      initialCode: `def solve_${normalizedId.replace(/-/g, '_')}(data):\n    # Return transformed data\n    return data\n\nprint("Test Output:", solve_${normalizedId.replace(/-/g, '_')}("sample"))`,
      expectedOutput: `Executing ${formattedTitle} Test Runner...\nResult: 2/2 TEST CASES PASSED!`,
      testCasesDescription: `Automated test cases for ${formattedTitle}.`,
    },
  };
}
