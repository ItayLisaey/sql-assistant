import { Configuration, OpenAIApi } from 'openai';

export async function POST(request: Request) {
  const body = await request.json();

  const query = body.query;

  const config = new Configuration({
    apiKey: process.env.OPENAI_KEY,
  });

  const openai = new OpenAIApi(config);

  const prompt = query;
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content:
          'You are an machine that takes a desciption for a query and creates a sql query based on an imagenry database.' +
          'You are allowed to anwser only in one sql query that is valid for the given database. WITHOUT Notes or descriptions! only valid sql' +
          'if you are not able to anwser the question you can say "I don\'t know".',
      },
      {
        role: 'system',
        content: `This is the database that you are working on:
        The Countries table contains columns for the country code (String), name (String), continent (String), capital (String), population (Integer), GDP (Double), GDP per capita (Double), area (Double), currency (String), official languages (String), international dialing code (String), and independence date (Date).

        The Military Strength table includes columns for the country code (String), total military personnel (Integer), active military personnel (Integer), reserve military personnel (Integer), tanks (Integer), armored fighting vehicles (Integer), total aircraft (Integer), fighter aircraft (Integer), helicopters (Integer), and naval strength ranking (Integer).
        
        The Economy table includes columns for the country code (String), GDP (Double), GDP per capita (Double), purchasing power parity (Double), labor force (Integer), unemployment rate (Double), inflation rate (Double), public debt (Double), imports (Double), exports (Double), trade balance (Double), and foreign direct investment (Double).`,
      },
      {
        role: 'user',
        content: query,
      },
    ],
  });

  const choice = response.data.choices[0].message?.content;

  console.log('response', response.data.choices);
  const result = JSON.stringify({ result: choice });
  return new Response(result);
}
