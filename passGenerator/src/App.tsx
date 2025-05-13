import { useState, useCallback, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [length, setlength] = useState(8);
  const [isnumber, setisnumber] = useState(false);
  const [isCharacter, setisCharacter] = useState(false);
  const [password, setpassword] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const passRef = useRef(null);
  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (isnumber) str += "0123456789";
    if (isCharacter) str += "!@#$%^&*()_+~`|}{[]";

    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str[char];
    }
    setpassword(pass);
  }, [length, isnumber, isCharacter]);

  useEffect(() => {
    generatePassword();
  }, [length, isCharacter, isnumber]);

  const copyToClipboard = () => {
    window.navigator.clipboard.writeText(password);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 to-purple-900">
        <div className="w-full max-w-md mx-4 p-8 rounded-2xl bg-gray-900 bg-opacity-80 backdrop-blur-lg border border-gray-700 shadow-2xl">
          <h1 className="text-white text-center text-3xl font-bold mb-6">
            Password Generator
          </h1>
          <div className="flex shadow-lg rounded-xl overflow-hidden mb-6">
            <input
              type="text"
              value={password}
              className="outline-none w-full py-3 px-4 bg-gray-800 text-white text-lg font-mono"
              placeholder="Password"
              readOnly
              ref={passRef}
            />
            <button
              className={`outline-none px-5 py-3 shrink-0 transition-all duration-300 ${
                isCopied ? "bg-green-600" : "bg-indigo-600 hover:bg-indigo-500"
              } text-white font-medium`}
              onClick={copyToClipboard}
            >
              {isCopied ? (
                <span className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Copied
                </span>
              ) : (
                <span className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                  </svg>
                  Copy
                </span>
              )}
            </button>
          </div>
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label htmlFor="length" className="text-gray-300">
                  Length: {length}
                </label>
                <span className="text-indigo-400 font-mono">{length}</span>
              </div>
              <input
                type="range"
                min={6}
                max={25}
                value={length}
                className="h-2 w-full bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                onChange={(e) => {
                  setlength(Number(e.target.value));
                }}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="numberCheckbox"
                  checked={isnumber}
                  onChange={() => {
                    setisnumber((prev) => !prev);
                  }}
                  className="w-5 h-5 text-indigo-600 bg-gray-700 rounded border-gray-600 focus:ring-indigo-500"
                />
                <label
                  htmlFor="numberCheckbox"
                  className="ml-2 text-gray-300 select-none"
                >
                  Include Numbers
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="charCheckbox"
                  checked={isCharacter}
                  onChange={() => {
                    setisCharacter((prev) => !prev);
                  }}
                  className="w-5 h-5 text-indigo-600 bg-gray-700 rounded border-gray-600 focus:ring-indigo-500"
                />
                <label
                  htmlFor="charCheckbox"
                  className="ml-2 text-gray-300 select-none"
                >
                  Special Characters
                </label>
              </div>
            </div>
            <button
              onClick={generatePassword}
              className="w-full mt-6 bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                  clipRule="evenodd"
                />
              </svg>
              Regenerate Password
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
