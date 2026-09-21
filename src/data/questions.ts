export interface Question {
  id: string;
  category: string;
  topic: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const DIAGNOSTIC_QUESTIONS: Question[] = [
  {
    id: 'q1',
    category: 'AI/ML Engineer',
    topic: 'Backpropagation & Chain Rule',
    question: 'In a multi-layer computational graph, how is the gradient of loss L with respect to input matrix X calculated during backpropagation?',
    options: [
      'By taking the element-wise sum of forward activations.',
      'By applying the matrix chain rule backwards from scalar loss L to X.',
      'By multiplying the learning rate with the input vector transpose.',
      'By computing the determinant of the weight matrix W.',
    ],
    correctAnswer: 1,
    explanation: 'Backpropagation applies the multivariate chain rule backwards through intermediate computational graph nodes to compute dL/dX.',
  },
  {
    id: 'q2',
    category: 'AI/ML Engineer',
    topic: 'Optimization & Loss Functions',
    question: 'Why is Softmax combined with Categorical Cross-Entropy loss preferred for multi-class classification?',
    options: [
      'Because it converts raw logits into probability distribution where derivatives reduce to (y_hat - y).',
      'Because it prevents weight decay from shrinking layer gradients to zero.',
      'Because it guarantees convex optimization for non-linear deep networks.',
      'Because it eliminates the need for activation functions in hidden layers.',
    ],
    correctAnswer: 0,
    explanation: 'The combination yields an elegant gradient gradient derivative (y_hat - y), ensuring smooth numerical stability during gradient descent.',
  },
  {
    id: 'q3',
    category: 'Foundational Math',
    topic: 'Linear Algebra & Tensors',
    question: 'Given matrix A of shape (N, D) and matrix W of shape (D, K), what is the shape of matrix multiplication result Z = A @ W?',
    options: [
      '(D, D)',
      '(N, K)',
      '(N, D, K)',
      '(K, N)',
    ],
    correctAnswer: 1,
    explanation: 'Matrix multiplication of (N, D) by (D, K) reduces inner dimension D, producing output dimension (N, K).',
  },
  {
    id: 'q4',
    category: 'AI Architecture',
    topic: 'Transformers & Self-Attention',
    question: 'In the Scaled Dot-Product Attention formula Attention(Q, K, V) = softmax(Q K^T / sqrt(d_k)) V, why do we scale by sqrt(d_k)?',
    options: [
      'To prevent dot products from growing excessively large in high dimensions, which pushes softmax into vanishing gradient regions.',
      'To increase the learning rate of positional encoding embeddings.',
      'To reduce memory consumption of attention weight matrices by half.',
      'To force attention matrices to become symmetric positive-definite.',
    ],
    correctAnswer: 0,
    explanation: 'For large values of d_k, dot products grow large in magnitude, causing softmax to saturate and yield extremely small gradients.',
  },
  {
    id: 'q5',
    category: 'Deep Learning',
    topic: 'Regularization & Overfitting',
    question: 'What is the primary function of Dropout layers during deep neural network training?',
    options: [
      'Randomly zero out activations with probability p to prevent co-adaptation of features.',
      'Permanently delete inactive neurons from memory after each epoch.',
      'Scale down input feature values between 0 and 1.',
      'Clip gradients to prevent exploding weight updates.',
    ],
    correctAnswer: 0,
    explanation: 'Dropout forces the network to learn redundant representations by randomly setting neuron outputs to 0 during training passes.',
  },
];
