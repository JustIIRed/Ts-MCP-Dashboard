import type { Socket } from "socket.io-client";

interface IncomingAlertPayload {
  object: {};
}

export const MCPEventHandler = (socket: Socket): void => {
  socket.on("incomingAlert", ({}: IncomingAlertPayload) => {});
  socket.on("b", ({}: IncomingAlertPayload) => {});
  socket.on("c", async ({}: IncomingAlertPayload) => {});
  socket.on("d", async ({}: IncomingAlertPayload) => {});
};
