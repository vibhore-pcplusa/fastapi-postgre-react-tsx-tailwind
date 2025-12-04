import {useState,useEffect,useRef} from 'react';
const Playground = () => {
  const[count,setCount]=useState(0);
  const myref=useRef<HTMLInputElement>(null);
  const handletextbox=async() =>{
    if (myref.current) {
      myref.current.focus();
    }
  };
  const handletextboxadd=async() =>{
    setCount(count+1);
  };
  const changetextboxcolor = async() =>{
    if(myref.current)
    { 
    myref.current.style.backgroundColor="blue";
    }
  }
  const removetextboxcolor = async() =>{
    if(myref.current)
    { 
    myref.current.style.backgroundColor="white";
    }
  }
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">Playground</h1>
      <p className="text-gray-600">
        I am playground for react will soon will learn to use useRef.
      </p>
      <input type="text" ref={myref} value={count}/>
      <input type="button" onClick={handletextbox} value="do focus" style={{border: "2px solid red", borderRadius: "2px"}}/>
      <input type="button" onClick={handletextboxadd} value="add value one" style={{border: "2px solid red", borderRadius: "2px"}}/>
      <input type="button" onClick={changetextboxcolor} value="cange textbox color" style={{border: "5px solid blue", borderRadius: "5px"}}/>
      <input type="button" onClick={removetextboxcolor} value="remove textbox color" style={{border: "5px solid green", borderRadius: "5px"}}/>
    
    </div>
  );
};

export default Playground;