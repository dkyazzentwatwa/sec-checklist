import { pipeline, type Tensor, env } from '@xenova/transformers'

// Skip local model checks to avoid "Unexpected token <" errors (Vite returning index.html)
env.allowLocalModels = false
env.useBrowserCache = true
// Ensure onnxruntime-web loads matching local WASM binaries (avoid CDN version mismatch)
const wasmEnv = env.backends.onnx?.wasm
if (wasmEnv) {
  wasmEnv.wasmPaths = '/onnxruntime-web/'
  // Avoid proxy tensors that can break WASM execution in some browsers
  wasmEnv.proxy = false
  // Conservative WASM settings for wider compatibility
  wasmEnv.numThreads = 1
  ;(env as any).wasm = wasmEnv
}

let embedder: Awaited<ReturnType<typeof pipeline>> | null = null

export async function loadEmbeddingModel() {
  if (!embedder) {
    embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2')
  }
  return embedder
}

export async function generateEmbedding(text: string): Promise<number[]> {
  const model = await loadEmbeddingModel()
  const output = await model(text, { pooling: 'mean', normalize: true } as any) as Tensor
  return Array.from(output.data as Float32Array)
}

export function cosineSimilarity(a: number[], b: number[]) {
  if (a.length !== b.length) return 0
  let dot = 0
  let normA = 0
  let normB = 0

  for (let i = 0; i < a.length; i += 1) {
    dot += a[i] * b[i]
    normA += a[i] ** 2
    normB += b[i] ** 2
  }

  const denominator = Math.sqrt(normA) * Math.sqrt(normB)
  if (denominator === 0) return 0
  return dot / denominator
}
