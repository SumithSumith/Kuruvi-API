// Text preprocessing utilities
export async function preprocessText(text: string): Promise<string> {
  // Clean and normalize input text
  let processed = text.trim();
  
  // Convert to lowercase
  processed = processed.toLowerCase();
  
  // Remove extra whitespace
  processed = processed.replace(/\s+/g, ' ');
  
  // Handle special characters
  processed = processed.replace(/[^\w\s]/g, ' ');
  
  // Normalize unicode characters
  processed = processed.normalize('NFKC');
  
  return processed;
}

export async function postprocessText(text: string): Promise<string> {
  // Clean up model output
  let processed = text.trim();
  
  // Fix capitalization
  processed = processed.replace(/(^\w|\.\s+\w)/g, letter => letter.toUpperCase());
  
  // Fix spacing around punctuation
  processed = processed.replace(/\s+([.,!?])/g, '$1');
  
  // Remove repeated punctuation
  processed = processed.replace(/([.,!?])+/g, '$1');
  
  // Ensure proper sentence spacing
  processed = processed.replace(/([.!?])\s*(\w)/g, '$1 $2');
  
  return processed;
}