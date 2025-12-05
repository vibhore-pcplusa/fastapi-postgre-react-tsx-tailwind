import { useState } from 'react';

const AdvCalculator = () => {
  const [num1, setNum1] = useState(0);
  //const [num2, setNum2] = useState('');
  //const [result, setResult] = useState<number | null>(null);
  const [operator, setOperator] = useState('+');
  const [StoreFirstNum, setStoreFirstNum] = useState(0);
  const [hasDecimal, setHasDecimal] = useState(false);

  const calculate = () => {
    /*const n1 = num1;
    
    if (isNaN(n1)) {
      setResult(null);
      return;
    }*/

    let res: number;
    
    switch (operator) {
      case '+':
        res = StoreFirstNum + num1;
        break;
      case '-':
        res = StoreFirstNum - num1;
        break;
      case '*':
        res = StoreFirstNum * num1;
        break;
      case '/':
        res = num1 !== 0 ? StoreFirstNum / num1 : 0;
        break;
      default:
        res = 0;
    }
  
    setNum1(res);
  };

  const handlepercentage=()=>{
    setNum1(num1/100);
  };

  const handlebksp=()=>{
setNum1(Math.floor(num1/10));
  };

  const handleDecimal = () => {
    if (!hasDecimal) {
      setNum1(num1);
      setHasDecimal(true);
    }
  };

  const clear = () => {
    setNum1(0);
    setHasDecimal(false);
    //setResult(null);
  };
   
  const handlenumber = (mynum: number) =>{
    if(num1>1000000000)//protecting maximum number limit
    {
      return;
    }
    if(mynum===20)
    {
    setNum1(num1*100);  
    }else
    {
    if (hasDecimal) {
      const decimalPlaces = num1.toString().split('.')[1]?.length || 0;
      setNum1(num1 + mynum / Math.pow(10, decimalPlaces + 1));
    } else {
      setNum1(num1*10+mynum);
    }
    }
  };

  const handleoperator = (myoperator: string) =>{
    setOperator(myoperator);
    setStoreFirstNum(num1);
    setNum1(0);
    setHasDecimal(false);
  }; //('-')

  return (
    <div className="max-w-md mx-auto p-6 bg-gray rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Advanced Calculator</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Display</label>
          <input
            type="number"
            value={num1}
            /*onChange={(e) => setNum1(e.target.value)}*/
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 align-right"
            
          />
        </div>



        <div className="flex space-x-3">
          <button
            onClick={clear}
            className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
          >
            AC
          </button>
          <button
            onClick={handlebksp}
            className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
          >
            BKSP
          </button>
          <button
            onClick={handlepercentage}
            className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
          >
            %
          </button>
          <button
            onClick={() => handleoperator('/')}
            className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
          >
            /
          </button>
        </div>


        <div className="flex space-x-3">
          <button
            onClick={() => handlenumber(7)}
            className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
          >
            7
          </button>
          <button
            onClick={() => handlenumber(8)}
            className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
          >
            8
          </button>
          <button
            onClick={() => handlenumber(9)}
            className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
          >
            9
          </button>
          <button
            onClick={() => handleoperator('*')}
            className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
          >
            X
          </button>
        </div>


        <div className="flex space-x-3">
          <button
            onClick={() => handlenumber(4)}
            className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
          >
            4
          </button>
          <button
            onClick={() => handlenumber(5)}
            className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
          >
            5
          </button>
          <button
            onClick={() => handlenumber(6)}
            className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
          >
            6
          </button>
          <button
            onClick={() => handleoperator('-')}
            className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
          >
            -
          </button>
        </div>


        <div className="flex space-x-3">
          <button
            onClick={() => handlenumber(1)}
            className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
          >
            1
          </button>
          <button
            onClick={() => handlenumber(2)}
            className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
          >
            2
          </button>
          <button
            onClick={() => handlenumber(3)}
            className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
          >
            3
          </button>
          <button
            onClick={() => handleoperator('+')}
            className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
          >
            +
          </button>
        </div>


        <div  className="flex space-x-3">
          <button
            onClick={() => handlenumber(20)}
            className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
          >
            00
          </button>
          <button
            onClick={() => handlenumber(0)}
            className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
          >
            0
          </button>
          <button
            onClick={handleDecimal}
            className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
          >
            .
          </button>
          <button
            onClick={calculate}
            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            =
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default AdvCalculator;
