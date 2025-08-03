import { useDashboardStore } from "../../../../store/Zust/useDashboardStore";

// Status indicator component
const StatusItem = ({ label, online }: { label: string; online: boolean }) => (
  <div className="flex items-center gap-2">
    <span
      className={`h-3 w-3 rounded-full ${
        online ? "bg-success" : "bg-error"
      } inline-block`}
    />
    <span
      className={
        online ? "text-success font-semibold" : "text-error font-semibold"
      }
    >
      {label}
    </span>
  </div>
);

const Header = () => {
  const { serverState, isLoadingServerState } = useDashboardStore();

  if (isLoadingServerState) {
    return (
      <header className="flex items-center justify-center w-full h-full max-h-[25vh] min-h-[100px] bg-base-100 py-4">
        <span className="text-lg font-semibold">Loading server status...</span>
      </header>
    );
  }

  return (
    <header className="flex flex-row items-stretch justify-between w-full h-full max-h-[25vh] min-h-[100px] bg-base-100 py-4">
      {/* Server Status */}
      <div className="card card-bordered border-primary flex-[1.3] mx-2 bg-base-200 shadow">
        <div className="card-title border-b-2 border-primary text-primary px-4 pt-4 pb-2 rounded-t-box font-bold text-lg">
          Server Status
        </div>
        <div className="card-body p-4 pt-2">
          <StatusItem label="Running" online={serverState.isRunning} />
          <div>
            <strong>Uptime :</strong> {serverState.uptime}
          </div>
          <div>
            <strong>Heap Total :</strong> {serverState.heapUsed}
          </div>
          <div>
            <strong>RSS :</strong> {serverState.rss}
          </div>
        </div>
      </div>
      {/* DB Status */}
      <div className="card card-bordered border-success flex-1 mx-2 bg-base-200 shadow">
        <div className="card-title border-b-2 border-success text-success px-4 pt-4 pb-2 rounded-t-box font-bold text-lg">
          DB Status
        </div>
        <div className="card-body p-4 pt-2">
          <StatusItem
            label="MongoDB"
            online={serverState.dbStatus.isMongoOnline}
          />
          <StatusItem
            label="Redis"
            online={serverState.dbStatus.isRedisOnline}
          />
          <StatusItem
            label="TS Redis"
            online={serverState.dbStatus.isTsRedisOnline}
          />
        </div>
      </div>
      {/* API Status */}
      <div className="card card-bordered border-accent flex-1 mx-2 bg-base-200 shadow">
        <div className="card-title border-b-2 border-accent text-accent px-4 pt-4 pb-2 rounded-t-box font-bold text-lg">
          API Status
        </div>
        <div className="card-body p-4 pt-2">
          <StatusItem
            label="Spotify"
            online={serverState.apiStatus.isSpotifyApiOnline}
          />
          <StatusItem
            label="Twitch"
            online={serverState.apiStatus.isTwitchApiOnline}
          />
        </div>
      </div>
      {/* Client Status */}
      <div className="card card-bordered border-info flex-1 mx-2 bg-base-200 shadow">
        <div className="card-title border-b-2 border-info text-info px-4 pt-4 pb-2 rounded-t-box font-bold text-lg">
          Client Status
        </div>
        <div className="card-body p-4 pt-2">
          <StatusItem
            label="Discord"
            online={serverState.clientStatus.isDiscordClientOnline}
          />
          <StatusItem
            label="Discord WS"
            online={serverState.clientStatus.isDiscordWSOnline}
          />
          <StatusItem
            label="Twitch Listener"
            online={serverState.clientStatus.isTwitchChatListenerOnline}
          />
          <StatusItem
            label="Twitch Mimic"
            online={serverState.clientStatus.isTwitchChatMimicOnline}
          />
        </div>
      </div>
      {/* Connections */}
      <div className="card card-bordered border-warning flex-[1.3] mx-2 bg-base-200 shadow">
        <div className="card-title border-b-2 border-warning text-warning px-4 pt-4 pb-2 rounded-t-box font-bold text-lg">
          Connections
        </div>
        <div className="card-body p-4 pt-2">
          <div>
            <strong>Users:</strong> {serverState.users}
          </div>
          <div>
            <strong>Sockets:</strong> {serverState.sockets}
          </div>
          <div>
            <strong>Requests/sec:</strong> {serverState.reqsPerSec}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
