import { useState } from 'react';
import './App.css';

const Calculator = () => {
  const [input, setInput] = useState('');  
  const [error, setError] = useState('');  

  const handleClick = (value) => {
    setError('');  
    const lastChar = input.slice(-1);
    if (/[+\-*/]/.test(lastChar) && /[+\-*/]/.test(value)) {
      setInput(input.slice(0, -1) + value); 
    } else {
      setInput(prevInput => prevInput + value); 
    }
  };

  const handleClear = () => {
    setInput('');
    setError('');
  };

  const handleBackspace = () => {
    setInput(input.slice(0, -1));
    setError('');
  };

  const validateExpression = (expr) => {
    if (/[^0-9+\-*/().]/.test(expr)) {
      return 'Invalid characters';
    }

    if (/([+\-*/]{2,})/.test(expr)) {
      return 'Invalid operator sequence';
    }

    if (/[+\-*/]$/.test(expr)) {
      return 'Incomplete expression';
    }

    if (/\/0/.test(expr)) {
      return 'Division by zero';
    }

    let openParentheses = 0;
    for (let char of expr) {
      if (char === '(') openParentheses++;
      if (char === ')') openParentheses--;
      if (openParentheses < 0) return 'Mismatched parentheses';
    }

    if (openParentheses !== 0) return 'Mismatched parentheses';

    return null;  
  };

  const handleCalculate = () => {
    setError('');  

    const validationError = validateExpression(input);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const result = new Function('return ' + input)();
      setInput(result.toString());
    } catch (error) {
      setError('Error');
    }
  };

  return (
    <>
    <span className='myName'>Yuvraj Yadav</span>
    <div className="calculator">
      <div className="display">
        {error ? <span className="error">{error}</span> : input || '0'}
      </div>
      <div className="buttons">
        {/* Move the Equal button to the top row and span two columns */}
        <button onClick={() => handleCalculate()} className="button equal span-two">=</button>

        <button onClick={() => handleBackspace()} className="button delete">←</button>
        <button onClick={() => handleClick('/')} className="button operator">/</button>

        <button onClick={() => handleClick('1')} className="button">1</button>
        <button onClick={() => handleClick('2')} className="button">2</button>
        <button onClick={() => handleClick('3')} className="button">3</button>
        <button onClick={() => handleClick('*')} className="button operator">x</button>

        <button onClick={() => handleClick('4')} className="button">4</button>
        <button onClick={() => handleClick('5')} className="button">5</button>
        <button onClick={() => handleClick('6')} className="button">6</button>
        <button onClick={() => handleClick('-')} className="button operator">-</button>

        <button onClick={() => handleClick('7')} className="button">7</button>
        <button onClick={() => handleClick('8')} className="button">8</button>
        <button onClick={() => handleClick('9')} className="button">9</button>
        <button onClick={() => handleClick('+')} className="button operator">+</button>

        <button onClick={() => handleClick('0')} className="button">0</button>
        <button onClick={() => handleClick('.')} className="button">.</button>
        <button onClick={() => handleClear()} className="button clear span-two">C</button>
      </div>
    </div>
    </>
  );
};

export default Calculator;
