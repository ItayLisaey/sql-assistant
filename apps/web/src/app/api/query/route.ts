import { Configuration, OpenAIApi } from 'openai';

export async function POST(request: Request) {
  const body = await request.json();

  const { query, database } = body;

  if (!query || !database) {
    return new Response(
      JSON.stringify({
        result: 'Missing Database description or a valid query.',
      })
    );
  }

  const config = new Configuration({
    apiKey: process.env.OPENAI_KEY,
  });

  const openai = new OpenAIApi(config);

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content:
          'You are an machine that takes a desciption for a database and a query and creates a sql query based on the given database description.' +
          'You are allowed to anwser only in one sql query that is valid for the given database. WITHOUT Notes or descriptions! only valid sql' +
          'if you are not able to anwser the question you can say "I don\'t know".',
      },
      {
        role: 'user',
        content: `This is the description of the database that you are working on: ${database}`,
      },
      {
        role: 'user',
        content: query,
      },
    ],
  });

  const choice = response.data.choices[0].message?.content;

  const result = JSON.stringify({ result: choice });

  return new Response(result);
}
