import { useState, useRef, useEffect } from "react";

function App() {
  const [history, setHistory] = useState<string[]>([
    "Welcome to the MCP terminal.",
    "Type 'help' to get started.",
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  // Command handler function
  const handleCommand = (cmd: string) => {
    const command = cmd.trim().toLowerCase();
    switch (command) {
      case "help":
        return [
          "Available commands:",
          "help - Show this help message",
          "clear - Clear the terminal",
        ];
      case "clear":
        return "CLEAR";
      case "":
        return [];
      default:
        return [`Unknown command: ${cmd}`];
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setHistory((prev) => {
        const newHistory = [...prev, `$ ${input}`];
        const result = handleCommand(input);
        if (result === "CLEAR") {
          return [];
        } else if (Array.isArray(result)) {
          return [...newHistory, ...result];
        }
        return newHistory;
      });
      setInput("");
    }
  };

  return (
    <div
      style={{
        background: "#181818",
        color: "#d1d5db",
        fontFamily: "monospace",
        minHeight: "100vh",
        padding: "1.5rem",
      }}
      onClick={() => inputRef.current?.focus()}
    >
      <div>
        {history.map((line, idx) => (
          <div key={idx}>
            {line.startsWith("$") ? (
              <>
                <span style={{ color: "#22d3ee" }}>$</span>{" "}
                <span>{line.slice(2)}</span>
              </>
            ) : (
              <span>{line}</span>
            )}
          </div>
        ))}
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ color: "#22d3ee" }}>$</span>&nbsp;
          <input
            ref={inputRef}
            value={input}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            style={{
              background: "transparent",
              border: "none",
              color: "#d1d5db",
              fontFamily: "monospace",
              outline: "none",
              fontSize: "1em",
              width: "100%",
            }}
            autoFocus
          />
        </div>
      </div>
    </div>
  );
}

export default App;
