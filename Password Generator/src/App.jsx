import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null)
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) {
      str += "1234567890";
    }
    if (charAllowed) {
      str += "!@#$%^&*()+{}:<>?~";
    }
    let strLength = str.length;
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * strLength + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed,charAllowed,setPassword]);

  // useRef Hook to copy input field
  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select()   // it will highlight the text that is being copied when copy btn is pressed. 
    // here ? is written to optionally highlight the text
    passwordRef.current?.setSelectionRange(0,99)  // it will set the range that the user can copy and not the whole text if we want
    window.navigator.clipboard.writeText(password)
  },[password])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-700 text-orange-500">
        <h1 className="text-4xl text-center text-white my-3">
          Password Generator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            className="outline-none w-full py-1 px-3"
            type="text"
            value={password}
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button onClick={copyPasswordToClipboard} className="outline-none bg-blue-700 text-white px-3 py-2 shrink-0">
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              onChange={(e) => {
                setLength(e.target.value);
              }}
              min={8}
              max={100}
              value={length}
              className="cursor-pointer"
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              id="numberInput"
              onChange={(e) => {
                setNumberAllowed((prevValue) => {
                  return !prevValue;
                });
              }}
              value={numberAllowed}
              className="cursor-pointer"
            />
            <label>Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              id="numberInput"
              onChange={(e) => {
                setCharAllowed((prevValue) => {
                  return !prevValue;
                });
              }}
              value={charAllowed}
              className="cursor-pointer"
            />
            <label>Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
