import "./index.css";
import { useState } from "react";
import reactLogo from "./assets/react.svg";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex justify-center items-center gap-8 mt-8">
        <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
          <img
            src="/vite.svg"
            className="h-24 w-24 transition-transform hover:scale-110"
            alt="Vite logo"
          />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          <img
            src={reactLogo}
            className="h-24 w-24 transition-transform hover:scale-110"
            alt="React logo"
          />
        </a>
      </div>
      <h1 className="text-4xl font-bold text-center mt-8 text-primary">
        Vite + React
      </h1>
      <div className="card bg-base-200 shadow-xl p-8 mt-8 mx-auto max-w-md flex flex-col items-center">
        <button
          className="btn btn-primary mb-4"
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </button>
        <p className="text-base-content">
          Edit{" "}
          <code className="bg-base-300 px-1 rounded">{`src/App.tsx`}</code> and
          save to test HMR
        </p>
      </div>
      <p className="text-center text-secondary mt-6">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
