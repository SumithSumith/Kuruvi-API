import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export class GPTService {
  async generateResponse(prompt: string, model = 'gpt-4-turbo-preview') {
    try {
      const completion = await openai.chat.completions.create({
        model,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 2000,
      });

      return completion.choices[0].message.content;
    } catch (error) {
      console.error('GPT API Error:', error);
      throw new Error('Failed to generate response');
    }
  }
}

export const gptService = new GPTService();