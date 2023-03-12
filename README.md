# AI-Powered SQL Assistant

The SQL Assistant is a web application that allows users to enter a natural language query and receive a corresponding SQL query. It accomplishes this by taking in two inputs: a description of the database schema and the user's natural language query. The SQL Assistant then translates the user's query into a valid SQL query based on the given schema.


## Why I Built This App

I built this application to demonstrate the capabilities of OpenAI's tools and APIs to my team.  

By leveraging OpenAI's capabilities, I was able to create a more user-friendly and accessible interface for querying databases. Additionally, this application can save time and reduce errors when compared to manually writing SQL queries.

As this technology continues to evolve at a rapid pace, the role of developers is also changing. Developers need to be able to leverage a variety of tools and technologies, including artificial intelligence (AI). By learning how to use basic AI tools, my team members could increase their value's and capabilities.


## How to Use This App
### Installation
1. Clone the repository to your local machine.
1. Set up an OpenAI API key by following the instructions on the [OpenAI API website](https://platform.openai.com/docs/api-reference/authentication).
1. Create a .env.local file in the `apps/web` directory of the project and add your OpenAI API key as follows:
```
  OPENAI_KEY=YOUR-KEY-HERE
```  
4. Start the application by running `npm start`.

### Usage
1. Open your web browser and go to http://localhost:3000/.
1. Describe your database in the "Describe database" field.
1. Click "Next".
1. Enter your natural language query in the "Query" field.
1. Click "Next".
1. The translated SQL query will be displayed.

## Technologies Used
- Node.JS
- OpenAI API
- React
- Next.JS
- XState

## Resources
- [OpenAI API](https://platform.openai.com/docs/api-reference)
