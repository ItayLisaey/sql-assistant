import { Configuration, OpenAIApi } from 'openai';

export async function POST(request: Request) {
  const body = await request.json();

  const query = body.query;

  const config = new Configuration({
    apiKey: process.env.OPENAI_KEY,
  });

  const openai = new OpenAIApi(config);

  const prompt = query;
  const completion = await openai.createCompletion({
    model: 'code-davinci-002',
    prompt: prompt,

    temperature: 0,
    max_tokens: 150,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });

  const choice = completion.data.choices[0].text;

  console.log('choice', choice);
  const result = JSON.stringify({ result: choice });
  return new Response(result);
}
