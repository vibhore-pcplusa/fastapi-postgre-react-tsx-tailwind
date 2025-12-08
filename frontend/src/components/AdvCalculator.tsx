import { useState } from 'react';

const AdvCalculator = () => {
  const [num1, setNum1] = useState<number>(0);
  const [operator, setOperator] = useState('+');
  const [hasoperator, setHasOperator] = useState(false);
  const [StoreFirstNum, setStoreFirstNum] = useState(0);
  const [hasDecimal, setHasDecimal] = useState(false);

  const calculate = (firstNum: number, secondNum: number, op: string): number => {
    console.log(`Calculating: ${firstNum} ${op} ${secondNum}`); // Debug log
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
    setHasOperator(false);
  };

  const handlepercentage = () => {
    setNum1(num1 / 100);
  };

  const handlebksp = () => {
    setNum1(Math.floor(num1 / 10));
  };

  const handleDecimal = () => {
    if (!hasDecimal) {
      setHasDecimal(true);
    }
  };

  const clear = () => {
    setNum1(0);
    setStoreFirstNum(0);
    setOperator('+');
    setHasDecimal(false);
    setHasOperator(false);
  };

  const handlenumber = (mynum: number) => {
    console.log(`Number pressed: ${mynum}, hasoperator: ${hasoperator}, num1: ${num1}`); // Debug log
    if (hasoperator) {
      setNum1(mynum); // Replace the current value with the new number
      //setHasOperator(false); // Reset operator flag
    } else {
      if (num1 > 1000000000) return; // Protect maximum number limit
      if (mynum === 20) {
        setNum1(num1 * 100);
      } else {
        if (hasDecimal) {
          const decimalPlaces = num1.toString().split('.')[1]?.length || 0;
          setNum1(num1 + mynum / Math.pow(10, decimalPlaces + 1));
        } else {
          setNum1(num1 * 10 + mynum);
        }
      }
    }
    console.log(`Updated num1: ${num1}`); // Debug log
  };

  const handleoperator = (myoperator: string) => {
    setHasOperator(true); 
    console.log(`Operator pressed: ${myoperator}, hasoperator: ${hasoperator}, num1: ${num1}, StoreFirstNum: ${StoreFirstNum}`); // Debug log
    if (hasoperator) {
      const result = calculate(StoreFirstNum, num1, operator); // Calculate intermediate result
      console.log(`Intermediate result: ${result}`); // Debug log
      setStoreFirstNum(result); // Update stored result
      setNum1(result); // Display intermediate result
    } else {
      setStoreFirstNum(num1); // Store the first number
      console.log(`Stored first number: ${num1}`); // Debug log
    }
    setOperator(myoperator); // Update the operator
    // Set operator flag
    setHasDecimal(false); // Reset decimal flag
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
          <button onClick={clear} className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors">AC</button>
          <button onClick={handlebksp} className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors">BKSP</button>
          <button onClick={handlepercentage} className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors">%</button>
          <button onClick={() => handleoperator('/')} className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors">/</button>
        </div>

        {/* Number and operator buttons */}
        <div className="flex space-x-3">
          {[7, 8, 9].map((n) => (
            <button key={n} onClick={() => handlenumber(n)} className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors">{n}</button>
          ))}
          <button onClick={() => handleoperator('*')} className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors">X</button>
        </div>

        <div className="flex space-x-3">
          {[4, 5, 6].map((n) => (
            <button key={n} onClick={() => handlenumber(n)} className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors">{n}</button>
          ))}
          <button onClick={() => handleoperator('-')} className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors">-</button>
        </div>

        <div className="flex space-x-3">
          {[1, 2, 3].map((n) => (
            <button key={n} onClick={() => handlenumber(n)} className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors">{n}</button>
          ))}
          <button onClick={() => handleoperator('+')} className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors">+</button>
        </div>

        <div className="flex space-x-3">
          <button onClick={() => handlenumber(20)} className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors">00</button>
          <button onClick={() => handlenumber(0)} className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors">0</button>
          <button onClick={handleDecimal} className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors">.</button>
          <button onClick={() => handleoperator('=')} className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors">=</button>
        </div>
      </div>
    </div>
  );
};

export default AdvCalculator;
