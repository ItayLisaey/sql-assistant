import { PLACEHOLDER } from '@/constants/placeholder.const';
import { useMachine } from '@xstate/react';
import { assign, createMachine } from 'xstate';

export const processQuery = async (
  query: string,
  database: string,
  onSuccess: (value: string) => void,
  onError: (value: string) => void
) => {
  try {
    const response = await fetch('/api/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        database,
      }),
    });
    const data = await response.json();
    onSuccess(data.result);
  } catch (e: any) {
    onError(e.message);
  }
};

const machine = createMachine({
  id: 'Wizard',
  initial: 'describe-database',
  states: {
    'describe-database': {
      on: {
        PROCEED: {
          target: 'describe-query',
          actions: assign({ database: (context, event) => event.value }),
        },
      },
    },
    'describe-query': {
      on: {
        CANCEL: {
          target: 'describe-database',
        },
        PROCEED: {
          target: 'process',
          actions: [
            assign({ query: (context, event) => event.value }),
            'sendQuery',
          ],
        },
      },
    },
    process: {
      on: {
        ERROR: {
          target: 'describe-query',
          actions: assign({ error: (context, event) => event.value }),
        },
        SUCCESS: {
          target: 'describe-query',
          actions: assign({ result: (context, event) => event.value }),
        },
      },
    },
  },
  schema: {
    context: {} as {
      database?: string;
      query?: string;
      result?: string;
      error?: string;
    },
    events: {} as
      | { type: 'PROCEED'; value: string }
      | { type: 'CANCEL' }
      | { type: 'ERROR'; value: string }
      | { type: 'SUCCESS'; value: string },
  },
  context: {
    database: PLACEHOLDER.database,
  },
  predictableActionArguments: true,
  preserveActionOrder: true,
});

export const useWizardState = () => useMachine(machine);
