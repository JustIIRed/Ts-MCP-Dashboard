import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTerminalStore } from "../../../store/Zust/useTerminalStore";

function terminalPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Zustand store hooks
  const history = useTerminalStore((s) => s.history);
  const currentCommand = useTerminalStore((s) => s.currentCommand);
  const setCurrentCommand = useTerminalStore((s) => s.setCurrentCommand);
  const appendHistory = useTerminalStore((s) => s.appendHistory);
  const clearHistory = useTerminalStore((s) => s.clearHistory);

  // Prevent duplicate welcome messages
  const hasWelcomed = useRef(false);

  useEffect(() => {
    inputRef.current?.focus();
    // Only show welcome messages once per session
    if (history.length === 0 && !hasWelcomed.current) {
      appendHistory({
        id: crypto.randomUUID(),
        command: "",
        output: "Welcome to the MCP terminal.",
        timestamp: new Date(),
      });
      appendHistory({
        id: crypto.randomUUID(),
        command: "",
        output: "Type 'help' to get started.",
        timestamp: new Date(),
      });
      hasWelcomed.current = true;
    }
    // eslint-disable-next-line
  }, [history.length]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentCommand(e.target.value);
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
          "test - Go to /test route",
        ];
      case "clear":
        clearHistory();
        return [];
      case "test":
        navigate("/test");
        return [`Navigating to /test...`];
      case "":
        return [];
      default:
        return [`Unknown command: ${cmd}`];
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const cmd = currentCommand;
      if (cmd.trim() !== "") {
        appendHistory({
          id: crypto.randomUUID(),
          command: cmd,
          output: `$ ${cmd}`,
          timestamp: new Date(),
        });
      }
      const results = handleCommand(cmd);
      results.forEach((output) => {
        appendHistory({
          id: crypto.randomUUID(),
          command: "",
          output,
          timestamp: new Date(),
        });
      });
      setCurrentCommand("");
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
        {history.map((entry) => (
          <div key={entry.id}>
            {entry.output.startsWith("$") ? (
              <>
                <span style={{ color: "#22d3ee" }}>$</span>{" "}
                <span>{entry.output.slice(2)}</span>
              </>
            ) : (
              <span>{entry.output}</span>
            )}
          </div>
        ))}
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ color: "#22d3ee" }}>$</span>&nbsp;
          <input
            ref={inputRef}
            value={currentCommand}
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

export default terminalPage;
