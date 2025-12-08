import { useState } from 'react';

const AdvCalculator = () => {
  const [num1, setNum1] = useState<number>(0); // Current number displayed
  const [operator, setOperator] = useState<string | null>(null); // Current operator
  const [StoreFirstNum, setStoreFirstNum] = useState<number | null>(null); // Stored first number
  const [hasDecimal, setHasDecimal] = useState(false); // Decimal flag
  const [isNewInput, setIsNewInput] = useState(false); // Flag to indicate if the next input is a new number

  const calculate = (firstNum: number, secondNum: number, op: string): number => {
    switch (op) {
      case '+':
        return firstNum + secondNum;
      case '-':
        return firstNum - secondNum;
      case '*':
        return firstNum * secondNum;
      case '/':
        return secondNum !== 0 ? firstNum / secondNum : 0;
      default:
        return secondNum;
    }
  };

  const handleNumber = (mynum: number) => {
    if (isNewInput) {
      // Start a new number input
      setNum1(mynum);
      setIsNewInput(false);
      setHasDecimal(false);
    } else {
      // Append to the current number
      if (num1 > 1000000000) return; // Protect maximum number limit
      if (hasDecimal) {
        const decimalPlaces = num1.toString().split('.')[1]?.length || 0;
        setNum1(num1 + mynum / Math.pow(10, decimalPlaces + 1));
      } else {
        setNum1(num1 * 10 + mynum);
      }
    }
  };

  const handleOperator = (myoperator: string) => {
    console.log(`Operator pressed: ${myoperator}, Current operator: ${operator}, StoreFirstNum: ${StoreFirstNum}, num1: ${num1}`); // Debug log

    if (isNewInput) {
        // If the user is pressing the operator repeatedly, just update the operator
        setOperator(myoperator);
        return;
    }

    if (StoreFirstNum !== null && operator) {
      // Perform intermediate calculation
      const result = calculate(StoreFirstNum, num1, operator);
      console.log(`Intermediate result: ${result}`); // Debug log
      setStoreFirstNum(result); // Update stored result
      setNum1(result); // Display intermediate result
    } else {
      // Store the first number
      setStoreFirstNum(num1);
      console.log(`Stored first number: ${num1}`); // Debug log
    }

    setOperator(myoperator); // Update the operator
    setIsNewInput(true); // Prepare for the next number input
  };

  const handleEqual = () => {
    console.log(`Equal pressed: StoreFirstNum: ${StoreFirstNum}, num1: ${num1}, operator: ${operator}`); // Debug log

    if (StoreFirstNum !== null && operator) {
        // Perform the final calculation
        const result = calculate(StoreFirstNum, num1, operator);
        console.log(`Result after =: ${result}`); // Debug log
        setNum1(result); // Display the result
        setStoreFirstNum(result); // Keep the result for further operations
        setOperator(null); // Clear the operator to wait for the next one
        setIsNewInput(true); // Prepare for the next input
    }
  };

  const handleClear = () => {
    setNum1(0);
    setStoreFirstNum(null);
    setOperator(null);
    setHasDecimal(false);
    setIsNewInput(false);
  };

  const handleBackspace = () => {
    if (!isNewInput) {
      setNum1(Math.floor(num1 / 10));
    }
  };

  const handlePercentage = () => {
    setNum1(num1 / 100);
  };

  const handleDecimal = () => {
    if (!hasDecimal) {
      setHasDecimal(true);
      setNum1(num1 + 0.0); // Add a decimal point
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Advanced Calculator</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Display</label>
          <input
            type="text"
            readOnly
            value={num1}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 align-right"
          />
        </div>

        <div className="flex space-x-3">
          <button onClick={handleClear} className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors">AC</button>
          <button onClick={handleBackspace} className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors">BKSP</button>
          <button onClick={handlePercentage} className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors">%</button>
          <button onClick={() => handleOperator('/')} className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors">/</button>
        </div>

        <div className="flex space-x-3">
          {[7, 8, 9].map((n) => (
            <button key={n} onClick={() => handleNumber(n)} className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors">{n}</button>
          ))}
          <button onClick={() => handleOperator('*')} className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors">X</button>
        </div>

        <div className="flex space-x-3">
          {[4, 5, 6].map((n) => (
            <button key={n} onClick={() => handleNumber(n)} className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors">{n}</button>
          ))}
          <button onClick={() => handleOperator('-')} className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors">-</button>
        </div>

        <div className="flex space-x-3">
          {[1, 2, 3].map((n) => (
            <button key={n} onClick={() => handleNumber(n)} className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors">{n}</button>
          ))}
          <button onClick={() => handleOperator('+')} className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors">+</button>
        </div>

        <div className="flex space-x-3">
          {/*<button onClick={() => handleNumber(20)} className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors">00</button>*/}
          <button onClick={() => handleNumber(0)} className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors">0</button>
          <button onClick={handleDecimal} className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors">.</button>
          <button onClick={handleEqual} className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors">=</button>
        </div>
      </div>
    </div>
  );
};

export default AdvCalculator;
