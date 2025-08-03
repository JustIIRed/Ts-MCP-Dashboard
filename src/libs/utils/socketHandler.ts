import type { Socket } from "socket.io-client";

import { MCPEventHandler } from "./socketHandler/MCPEventHandler";

interface SocketHandler {
  handleEvents: (socket: Socket) => Promise<void>;
}

export const socketHandler: SocketHandler = {
  handleEvents: async (socket: Socket): Promise<void> => {
    if (!socket) return;
    MCPEventHandler(socket);
  },
};
