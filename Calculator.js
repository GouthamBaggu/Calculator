import React, { useState, useEffect, useCallback } from 'react';
import { evaluate } from 'mathjs'; // Only import 'evaluate'
import './Calculator.css';

const Calculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [memory, setMemory] = useState(0);

  // Evaluate the expression using mathjs
  const handleCalculate = useCallback(() => {
    try {
      setResult(evaluate(input)); // Safely evaluates the expression
    } catch (error) {
      setResult('Error');
    }
  }, [input]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e) => {
      const { key } = e;
      if (/[0-9+\-*/().]/.test(key)) {
        setInput((prev) => prev + key);
      } else if (key === 'Enter') {
        handleCalculate();
      } else if (key === 'Backspace') {
        setInput((prev) => prev.slice(0, -1));
      } else if (key === 'Escape') {
        handleClear();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleCalculate]); // handleCalculate added as a dependency

  // Handle input for numbers and operators
  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  // Clear the input and result
  const handleClear = () => {
    setInput('');
    setResult('');
  };

  // Handle memory functions
  const handleMemoryAdd = () => {
    setMemory(memory + Number(result));
  };

  const handleMemorySubtract = () => {
    setMemory(memory - Number(result));
  };

  const handleMemoryRecall = () => {
    setInput(memory.toString());
  };

  // Scientific function handlers
  const handleSin = () => setInput((prev) => `sin(${prev})`);
  const handleCos = () => setInput((prev) => `cos(${prev})`);
  const handleTan = () => setInput((prev) => `tan(${prev})`);
  const handleLog = () => setInput((prev) => `log(${prev})`);
  const handleExp = () => setInput((prev) => `exp(${prev})`);

  return (
    <div className="calculator">
      <div className="display">
        <input type="text" value={input} readOnly />
        <div className="result">{result}</div>
      </div>
      <div className="buttons">
        <button onClick={handleClear}>C</button>
        <button onClick={() => handleClick('(')}>(</button>
        <button onClick={() => handleClick(')')}>)</button>
        <button onClick={() => handleClick('/')}>/</button>
        <button onClick={() => handleClick('7')}>7</button>
        <button onClick={() => handleClick('8')}>8</button>
        <button onClick={() => handleClick('9')}>9</button>
        <button onClick={() => handleClick('*')}>*</button>
        <button onClick={() => handleClick('4')}>4</button>
        <button onClick={() => handleClick('5')}>5</button>
        <button onClick={() => handleClick('6')}>6</button>
        <button onClick={() => handleClick('-')}>-</button>
        <button onClick={() => handleClick('1')}>1</button>
        <button onClick={() => handleClick('2')}>2</button>
        <button onClick={() => handleClick('3')}>3</button>
        <button onClick={() => handleClick('+')}>+</button>
        <button onClick={() => handleClick('0')}>0</button>
        <button onClick={() => handleClick('.')}>.</button>
        <button onClick={handleCalculate}>=</button>

        {/* Scientific Functionality */}
        <button onClick={handleSin}>sin</button>
        <button onClick={handleCos}>cos</button>
        <button onClick={handleTan}>tan</button>
        <button onClick={handleLog}>log</button>
        <button onClick={handleExp}>exp</button>

        {/* Memory Functions */}
        <button onClick={handleMemoryAdd}>M+</button>
        <button onClick={handleMemorySubtract}>M-</button>
        <button onClick={handleMemoryRecall}>MR</button>
      </div>
    </div>
  );
};

export default Calculator;
