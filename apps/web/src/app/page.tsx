'use client';

import Prism from 'prismjs';
import { useEffect } from 'react';
import styles from './page.module.scss';
//start:load the languages you need for your blog here
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
//end:load the languages you need for your blog here
import { useWizardState } from '@/components/Wizard/useWizardState';
import 'prismjs/themes/prism-twilight.css';
import { Wizard } from '../components/Wizard';

export default function Home() {
  const [current, send] = useWizardState();

  useEffect(() => {
    async function highlight() {
      Prism.highlightAll();
    }
    highlight();
  }, []);

  return (
    <main className={styles.main}>
      <section className={styles.pane}>
        <h1 className={styles.title}>SQL Assistant</h1>
        <Wizard current={current} send={send} />
      </section>
      {current.context.result && (
        <section className={styles.pane}>
          <pre className='language-sql'>
            <code className='language-sql'>{current.context.result}</code>
          </pre>
        </section>
      )}
    </main>
  );
}
