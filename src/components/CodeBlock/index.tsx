import React from 'react';
import styles from './style.module.scss';
import Prism from 'prismjs';
const CodeBlock = function (props: {
  narrow: boolean;
  language: string;
  children: React.ReactNode;
}) {
  React.useEffect(() => {
    Prism.highlightAll();
  }, []);
  return (
    <div className={`${styles.codeContainer} ${props.narrow && styles.narrow}`}>
      <div className={styles.codeTitle}>
        <span>{props.language.toUpperCase()}</span>
        <span>
          <button
            title='Copy'
            className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-1 px-2 rounded-lg'
            onClick={() => {
              try {
                navigator.clipboard.writeText(
                  props.children ? props.children.toString() : ''
                );
              } catch {
                console.log('Clipboard not supported');
              }
            }}
          >
            Copy
          </button>
        </span>
      </div>
      <pre className={styles.code}>
        <code className={`language-${props.language}`}>{props.children}</code>
      </pre>
    </div>
  );
};
export default CodeBlock;
