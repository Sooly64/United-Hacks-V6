import 'dotenv/config'; // This loads the .env file automatically
import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: 'https://api.featherless.ai/v1',
  apiKey: process.env.FEATHERLESS_API_KEY, // This pulls the key from your .env file
});

async function runChat() {
  try {
    const chatCompletion = await openai.chat.completions.create({
      model: 'deepseek-ai/DeepSeek-R1-0528',
      max_tokens: 4096,
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: 'What is the fastest way to get to the airport?' }
      ],
    });

    console.log(chatCompletion.choices[0].message.content);
  } catch (error) {
    console.error("Connection Error:", error.message);
  }
}

runChat();