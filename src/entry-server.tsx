import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App";
import { StaticRouter } from "react-router-dom";

export function render(_url: string) {
  const html = renderToString(
    <StrictMode>
      <StaticRouter location={_url}>
        <App />
      </StaticRouter>
    </StrictMode>
  );
  return { html };
}
