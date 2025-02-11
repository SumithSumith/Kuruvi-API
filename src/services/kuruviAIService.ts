import { EventEmitter } from 'events';
import { tokenize, detokenize } from '../utils/tokenizer';
import { preprocessText, postprocessText } from '../utils/textProcessor';
import { KuruviModel } from '../models/kuruviModel';

interface ModelParameters {
  temperature: number;
  maxTokens: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
}

interface GenerateOptions extends ModelParameters {
  stream: boolean;
  stopSequences?: string[];
}

export class KuruviAIService {
  private model: KuruviModel;
  private events: EventEmitter;
  private defaultParams: ModelParameters = {
    temperature: 0.7,
    maxTokens: 2000,
    topP: 0.9,
    frequencyPenalty: 0.0,
    presencePenalty: 0.0
  };

  constructor() {
    this.events = new EventEmitter();
    this.model = new KuruviModel({
      modelPath: '/models/kuruvi-base',
      vocabSize: 50257,
      maxSequenceLength: 2048,
      embeddingSize: 768
    });
  }

  private async tokenizeInput(text: string): Promise<number[]> {
    // Convert input text to token IDs
    const preprocessed = await preprocessText(text);
    return tokenize(preprocessed);
  }

  private async generateTokens(
    inputTokens: number[],
    params: ModelParameters
  ): AsyncGenerator<number, void, unknown> {
    let currentTokens = [...inputTokens];
    
    while (currentTokens.length < params.maxTokens) {
      // Get model predictions for next token
      const logits = await this.model.forward(currentTokens);
      
      // Apply temperature and top-p sampling
      const nextToken = await this.sampleNextToken(
        logits,
        params.temperature,
        params.topP
      );

      if (nextToken === this.model.endToken) {
        break;
      }

      yield nextToken;
      currentTokens.push(nextToken);
    }
  }

  private async sampleNextToken(
    logits: Float32Array,
    temperature: number,
    topP: number
  ): Promise<number> {
    // Apply temperature scaling
    const scaled = logits.map(x => x / temperature);
    
    // Convert to probabilities
    const probs = softmax(scaled);
    
    // Apply top-p (nucleus) sampling
    return nucleusSampling(probs, topP);
  }

  async generateResponse(
    prompt: string,
    options: Partial<GenerateOptions> = {}
  ) {
    try {
      // Merge default and user parameters
      const params = { ...this.defaultParams, ...options };
      
      // Preprocess and tokenize input
      const inputTokens = await this.tokenizeInput(prompt);
      
      // Generate response tokens
      const outputTokens: number[] = [];
      for await (const token of this.generateTokens(inputTokens, params)) {
        outputTokens.push(token);
      }
      
      // Convert tokens back to text
      const rawResponse = detokenize(outputTokens);
      const response = await postprocessText(rawResponse);

      return {
        response,
        usage: {
          promptTokens: inputTokens.length,
          completionTokens: outputTokens.length,
          totalTokens: inputTokens.length + outputTokens.length
        }
      };
    } catch (error) {
      console.error('Kuruvi AI Error:', error);
      throw new Error('Failed to generate response');
    }
  }

  async streamResponse(
    prompt: string,
    onToken: (token: string) => void,
    options: Partial<GenerateOptions> = {}
  ) {
    try {
      const params = { ...this.defaultParams, ...options };
      const inputTokens = await this.tokenizeInput(prompt);
      
      for await (const token of this.generateTokens(inputTokens, params)) {
        const text = detokenize([token]);
        onToken(text);
        
        // Check for stop sequences
        if (options.stopSequences?.some(seq => text.includes(seq))) {
          break;
        }
      }
    } catch (error) {
      console.error('Kuruvi AI Streaming Error:', error);
      throw new Error('Failed to stream response');
    }
  }
}

// Utility functions
function softmax(logits: Float32Array): Float32Array {
  const maxLogit = Math.max(...logits);
  const exps = logits.map(x => Math.exp(x - maxLogit));
  const sumExps = exps.reduce((a, b) => a + b, 0);
  return new Float32Array(exps.map(x => x / sumExps));
}

function nucleusSampling(probs: Float32Array, topP: number): number {
  // Sort probabilities in descending order
  const sorted = Array.from(probs)
    .map((p, i) => ({ p, i }))
    .sort((a, b) => b.p - a.p);
  
  // Find cutoff index for top-p
  let cumsum = 0;
  let cutoffIndex = sorted.length - 1;
  for (let i = 0; i < sorted.length; i++) {
    cumsum += sorted[i].p;
    if (cumsum >= topP) {
      cutoffIndex = i;
      break;
    }
  }
  
  // Sample from remaining tokens
  const rand = Math.random() * cumsum;
  let sum = 0;
  for (let i = 0; i <= cutoffIndex; i++) {
    sum += sorted[i].p;
    if (sum >= rand) {
      return sorted[i].i;
    }
  }
  
  return sorted[0].i;
}

export const kuruviAI = new KuruviAIService();