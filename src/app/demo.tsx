import React from 'react';
import { useState } from 'react';
import { validate } from '../lib/index';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import styles from './demo.module.css';

const Result: React.FC<{ result: any }> = ({ result }) => {
  if (result) {
    return (
      <Alert severity={result.valid ? 'success' : 'error'}>
        {result.valid ? 'VALID' : 'INVALID'}
        <br />
        {result.error ? result.error : ''}
      </Alert>
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
          <TextField
            style={{ width: '100%' }}
            label={`Enter a browserslist "targets" value`}
            variant="outlined"
            value={targets}
            onChange={(e) => setTargets(e.target.value)}
          />
        </li>
        <li>
          <TextField
            style={{ width: '100%' }}
            label={`Enter some javascript code`}
            variant="outlined"
            multiline
            rows={6}
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </li>
        <li>
          <Button
            variant="contained"
            color="primary"
            data-testid="validate-button"
            onClick={handleValidate}
          >
            validate
          </Button>
        </li>
        <li>
          <Typography variant="h6">View Results:</Typography>
          <br />
          <Result result={result} />
        </li>
      </ol>
    </div>
  );
};

export default Demo;
