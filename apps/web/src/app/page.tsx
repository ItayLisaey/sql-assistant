'use client';

import { useState } from 'react';
import styles from './page.module.scss';

export default function Home() {
  const [result, setResult] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const sendQuery = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResult(undefined);
    setLoading(true);

    const element = e.currentTarget.elements.namedItem(
      'query'
    ) as HTMLTextAreaElement | null;
    if (!element) {
      return;
    }

    try {
      const response = await fetch('/api/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: element.value,
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
      <form className={styles.pane} onSubmit={sendQuery}>
        <h1 className={styles.title}>טקסט-סקל</h1>
        <textarea
          name='query'
          rows={3}
          placeholder='מהן עשר הערים עם ציון המיגון הגבוהה ביותר'
        />
        <button>שלח</button>

        {loading && <div>טוען...</div>}
        {error && <div className={styles.error}>{error}</div>}
        {result && <div className={styles.result}>{result}</div>}
      </form>
    </main>
  );
}
