import { create } from "zustand";
import { ServerState, defaultServerState } from "../../conf/defaultServerState";
import { axiosInstance } from "../../libs/utils/axios";

type DashboardStore = {
  serverState: ServerState;
  isLoadingServerState: boolean;
  setIsLoadingServerState: (loading: boolean) => void;
  getServerState: () => Promise<void>;
};

export const useDashboardStore = create<DashboardStore>((set) => ({
  serverState: defaultServerState,
  isLoadingServerState: false,
  setIsLoadingServerState: (loading) => set({ isLoadingServerState: loading }),
  getServerState: async () => {
    set({ isLoadingServerState: true });
    try {
      const res = await axiosInstance.get<ServerState>("/server-state");
      set({ serverState: res.data });
    } catch {
      // Ignore
    } finally {
      set({ isLoadingServerState: false });
    }
  },
}));
