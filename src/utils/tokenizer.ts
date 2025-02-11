// Byte-Pair Encoding (BPE) implementation
export function tokenize(text: string): number[] {
  // Initialize with basic vocabulary
  const vocab = new Map<string, number>();
  const tokens: number[] = [];
  
  // Split text into basic units (characters/subwords)
  let units = text.split('');
  
  // Apply BPE merge operations
  while (units.length > 1) {
    // Find most frequent pair
    const pairs = getPairs(units);
    if (pairs.size === 0) break;
    
    const [pair, _] = Array.from(pairs.entries())
      .reduce((a, b) => b[1] > a[1] ? b : a);
    
    // Merge pair throughout the sequence
    units = mergePair(units, pair);
  }
  
  // Convert to token IDs
  for (const unit of units) {
    tokens.push(getTokenId(unit, vocab));
  }
  
  return tokens;
}

export function detokenize(tokens: number[]): string {
  // Convert token IDs back to text
  const vocab = new Map<number, string>();
  return tokens.map(id => vocab.get(id) || '').join('');
}

// Helper functions
function getPairs(units: string[]): Map<string, number> {
  const pairs = new Map<string, number>();
  for (let i = 0; i < units.length - 1; i++) {
    const pair = units[i] + units[i + 1];
    pairs.set(pair, (pairs.get(pair) || 0) + 1);
  }
  return pairs;
}

function mergePair(units: string[], pair: string): string[] {
  const result: string[] = [];
  for (let i = 0; i < units.length; i++) {
    if (i < units.length - 1 && units[i] + units[i + 1] === pair) {
      result.push(pair);
      i++;
    } else {
      result.push(units[i]);
    }
  }
  return result;
}

function getTokenId(unit: string, vocab: Map<string, number>): number {
  if (!vocab.has(unit)) {
    vocab.set(unit, vocab.size);
  }
  return vocab.get(unit)!;
}