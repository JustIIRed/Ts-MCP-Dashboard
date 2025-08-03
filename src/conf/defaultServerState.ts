// Default server state for initialization and fallback

export interface ServerState {
  log_level: number;
  isRunning: boolean;
  uptime: string;
  heapUsed: string;
  heapTotal: string;
  rss: string;
  reqsPerSec: number;
  users: number;
  sockets: number;
  dbStatus: {
    isMongoOnline: boolean;
    isRedisOnline: boolean;
    isTsRedisOnline: boolean;
  };
  apiStatus: {
    isSpotifyApiOnline: boolean;
    isTwitchApiOnline: boolean;
  };
  clientStatus: {
    isDiscordClientOnline: boolean;
    isDiscordWSOnline: boolean;
    isTwitchChatListenerOnline: boolean;
    isTwitchChatMimicOnline: boolean;
  };
  RAM: Record<string, unknown>;
}

export const defaultServerState: ServerState = {
  // Server status
  log_level: 1,
  isRunning: false,
  uptime: "",
  heapUsed: "0MB",
  heapTotal: "0MB",
  rss: "0MB",
  reqsPerSec: 0,

  // Dynamic state
  users: 0,
  sockets: 0,

  // Database status
  dbStatus: {
    isMongoOnline: false,
    isRedisOnline: false,
    isTsRedisOnline: false,
  },

  // API status
  apiStatus: {
    isSpotifyApiOnline: false,
    isTwitchApiOnline: false,
  },

  // Client status
  clientStatus: {
    isDiscordClientOnline: false,
    isDiscordWSOnline: false,
    isTwitchChatListenerOnline: false,
    isTwitchChatMimicOnline: false,
  },

  RAM: {},
};
