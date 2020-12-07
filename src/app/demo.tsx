import React from 'react';
import { useState } from 'react';
import { validate } from '../lib/index';
import styles from './demo.module.css';

const Result: React.FC<{ result: any }> = ({ result }) => {
  if (result) {
    return (
      <div
        style={{
          background: result.valid ? 'green' : 'red',
          color: 'white',
          padding: 40,
        }}
      >
        {result.valid ? 'VALID' : 'INVALID'}
        <br />
        {result.error ? result.error : ''}
      </div>
    );
  }
  return null;
};

const Demo = () => {
  const [targets, setTargets] = useState('ie 8');
  const [code, setCode] = useState('var life = 42;');
  const [result, setResult] = useState();

  const handleValidate = async () => {
    const result = await validate(code, targets);
    setResult(result);
  };
  return (
    <div className={styles.demo}>
      <ol>
        <li>
          Enter a browserslist "targets" value:
          <br />
          <input
            type="text"
            value={targets}
            onChange={(e) => setTargets(e.target.value)}
          />
        </li>
        <li>
          Enter some javascript code:
          <br />
          <textarea value={code} onChange={(e) => setCode(e.target.value)} />
        </li>
        <li>
          Click the "validate" button:
          <br />
          <button onClick={handleValidate}>validate</button>
        </li>
        <li>
          View Results:
          <br />
          <Result result={result} />
        </li>
      </ol>
    </div>
  );
};

export default Demo;
