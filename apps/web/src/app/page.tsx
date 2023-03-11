'use client';

import Prism from 'prismjs';
import { useEffect, useState } from 'react';
import styles from './page.module.scss';
//start:load the languages you need for your blog here
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
//end:load the languages you need for your blog here
import 'prismjs/themes/prism-twilight.css';

export default function Home() {
  const [query, setQuery] = useState<string | undefined>();
  const [result, setResult] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function highlight() {
      Prism.highlightAll();
    }
    highlight();
  }, []);

  const sendQuery = async () => {
    setResult(undefined);
    setLoading(true);

    try {
      const response = await fetch('/api/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
        }),
      });
      const data = await response.json();
      setResult(data.result);
      setError(data.error);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.main}>
      <section className={styles.pane}>
        <h1 className={styles.title}>SQL Assistant</h1>
        <textarea
          name='query'
          rows={3}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Type your query here...'
        />

        <button disabled={!query} onClick={sendQuery}>
          Process
        </button>
      </section>

      <section className={styles.pane}>
        {loading && <div>טוען...</div>}
        {error && <div className={styles.error}>{error}</div>}
        {result && (
          <pre className='language-sql'>
            <code className='language-sql'>{result}</code>
          </pre>
        )}
      </section>
    </main>
  );
}
