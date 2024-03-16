import React, { useState } from 'react';
import './App.css';

function App() {
  const [value, setValue] = useState('0');
  const [currentInput, setCurrentInput] = useState('');
  const [operator, setOperator] = useState(null);

  const handleNumberClick = (number) => {
    if (value === '0' || currentInput === '0') {
      setValue(number.toString());
      setCurrentInput(number.toString());
    } else {
      setValue(value + number);
      setCurrentInput(currentInput + number);
    }
  };

  const handleOperatorClick = (op) => {
    if (operator !== null) {
      // If an operator is already set, evaluate the expression
      handleEqualsClick();
    }
    setOperator(op);
    setValue(value + op);
    setCurrentInput('');
  };

  const handleEqualsClick = () => {
    if (operator !== null) {
      try {
        const result = new Function(`return ${value}`)();
        setValue(result.toString());
        setCurrentInput(result.toString());
        setOperator(null);
      } catch (error) {
        // Handle error if the expression is invalid
        setValue('Error');
        setCurrentInput('');
        setOperator(null);
      }
    }
  };

  const handleClearClick = () => {
    setValue('0');
    setCurrentInput('');
    setOperator(null);
  };
  
  const handleDeleteClick = () => {
    // Remove the last character from currentInput
    setCurrentInput(currentInput.slice(0, -1));

    // If there are no more characters, set the value to '0'
    if (currentInput.length === 0) {
      setValue('0');
    } else {
      // Otherwise, update the value with the currentInput
      setValue(currentInput);
    }
  };
  const handleDoubleZeroClick = () => {
    // Append '00' to the current input
    setValue(value + '00');
    setCurrentInput(currentInput + '00');
  };
  const handlePercentageClick = () => {
    // Convert the current value to a percentage
    const percentageValue = (parseFloat(value) / 100).toString();
    setValue(percentageValue);
    setCurrentInput(percentageValue);
  };


  return (
  
    <div className="calculator">
      <h2>{value}</h2>
      <div className="buttons">
        <button onClick={() => handleNumberClick('1')}>1</button>
        <button onClick={() => handleNumberClick('2')}>2</button>
        <button onClick={() => handleNumberClick('3')}>3</button>
        <button onClick={() => handleOperatorClick('+')}>+</button>

        <button onClick={() => handleNumberClick('4')}>4</button>
        <button onClick={() => handleNumberClick('5')}>5</button>
        <button onClick={() => handleNumberClick('6')}>6</button>
        <button onClick={() => handleOperatorClick('-')}>-</button>

        <button onClick={() => handleNumberClick('7')}>7</button>
        <button onClick={() => handleNumberClick('8')}>8</button>
        <button onClick={() => handleNumberClick('9')}>9</button>
        <button onClick={() => handleOperatorClick('*')}>*</button>

        <button onClick={() => handleNumberClick('0')}>0</button>
        <button onClick={() => handleDoubleZeroClick('00')}>00</button>
        <button onClick={() => handleOperatorClick('.')}>.</button>
        <button onClick={() => handleOperatorClick('/')}>/</button>

        <button onClick={() => handleClearClick()}>C</button>
        <button onClick={() => handleDeleteClick()}>DE</button>
        <button onClick={() => handleEqualsClick()}>=</button>
        <button onClick={() => handlePercentageClick()}>%</button>
        

      </div>
    </div>
  );
}

export default App;
