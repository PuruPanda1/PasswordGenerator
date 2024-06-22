import { useState, useCallback, useEffect, useRef } from "react";
import Box from "./components/Box";
import "@radix-ui/themes/styles.css";

function App() {
  const [password, setPassword] = useState("tPXBJM}");
  const [length, setLength] = useState(8);
  const [isNumberAllowed, setNumberAllowed] = useState(false);
  const [isCharacterAllowed, setCharacterAllowed] = useState(true);
  const passwordRef = useRef(null);

  // Used for optimisation for caching & storing
  const passwordGenerator = useCallback(() => {
    let pass = "";

    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (isNumberAllowed) str += "0123456789";
    if (isCharacterAllowed) str += "{}[]()!@#$%^&*_+-";

    for (let i = 1; i <= length; i++) {
      const index = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(index);
    }

    setPassword(pass);
  }, [length, isNumberAllowed, isCharacterAllowed, setPassword]);

  const handleSliderChange = (event) => {
    setLength(event.target.value);
  };

  const copyPassToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  // used to call the password Generator whenever there is change in the given dependencies
  useEffect(() => {
    passwordGenerator();
  }, [isNumberAllowed.isCharacterAllowed, length, passwordGenerator]);

  return (
    <>
    <Box/>
    <div className="flex items-center justify-center flex-col">
      <h1 className="text-3xl mt-10 text-white text-center w-full">
        Password Generator
      </h1>
      <input
        className="my-5 mx-auto text-center bg-black text-white text-xl"
        value={password}
        readOnly
        ref = {passwordRef}
      />

      <input
        id="slider"
        type="range"
        min="8"
        max="100"
        value={length}
        onChange={handleSliderChange}
        className="slider appearance-none bg-blue-300 h-2 rounded-lg"
      />

      <span className="text-white mt-2">{length}</span>

      <div className="m-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-600"
            checked={isNumberAllowed}
            onChange={() => setNumberAllowed(!isNumberAllowed)}
          />
          <span className="ml-2 text-gray-700">Number</span>
        </label>
        <p className="mt-2 text-white">
          Checkbox is {isNumberAllowed ? "checked" : "unchecked"}.
        </p>
      </div>

      <div className="m-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-600"
            checked={isCharacterAllowed}
            onChange={() => setCharacterAllowed(!isCharacterAllowed)}
          />
          <span className="ml-2 text-gray-700">Character</span>
        </label>
        <p className="mt-2 text-white">
          Checkbox is {isCharacterAllowed ? "checked" : "unchecked"}.
        </p>
      </div>

      <div className="flex justify-around m-auto">
        <button
          onClick={passwordGenerator}
          className="mt-2 mx-2 outline-dashed bg-green-600 text-white flex justify-center m-auto"
        >
          Generate Password
        </button>
        <button
          onClick={copyPassToClipboard}
          className="mt-2 mx-2 outline-dashed bg-green-600 text-white flex justify-center m-auto"
        >
          Copy Password
        </button>
      </div>
    </div>
    </>
  );
}

export default App;
