import React from 'react';
import { useState } from 'react';
import { validate } from '../lib/index';

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
    <div>
      demo:
      <h2>targets:</h2>
      <input
        type="text"
        value={targets}
        onChange={(e) => setTargets(e.target.value)}
      />
      <h2>code:</h2>
      <textarea value={code} onChange={(e) => setCode(e.target.value)} />
      <br />
      <button onClick={handleValidate}>validate</button>
      <br />
      <Result result={result} />
    </div>
  );
};

export default Demo;
