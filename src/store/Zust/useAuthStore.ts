import { io } from "socket.io-client";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

import { axiosInstance } from "../../libs/utils/axios";
import { socketHandler } from "../../libs/utils/socketHandler";
import { getFingerprint } from "../../security/deviceFingerprint";

const BASE_URL = "https://api.ever-all.us";

export const useAuthStore = create<AuthStore>((set, get) => ({
  authUser: null,
  userForm: null,
  isCheckingAuth: true,
  isLoggingIn: false,
  isLoggingOut: false,
  isSigningUp: false,
  isVerifying: false,
  isDeletingProfile: false,
  isUpdatingProfile: false,
  isAddingAuthenticator: false,
  onlineUsers: [],
  socket: null,
  sessionExpired: false,
  setSessionExpired: (expired: boolean): void => {
    set({ sessionExpired: expired });
  },
  checkAuth: async (): Promise<boolean> => {
    console.log("Checking auth for user");
    try {
      const res = await axiosInstance.get<AuthUser>("/auth/check");
      set({ authUser: res.data });
      // Only connect socket if not guest user
      if (res.data._id !== "0000000000000000001") {
        get().connectSocket();
      }
      return true;
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      if (axiosError?.response?.status === 401) {
        toast.error("Authentication Failed");
      } else {
        toast.error("Authentication Error.");
      }
      set({ authUser: null });
      return false;
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  keepAuth: async (): Promise<boolean> => {
    try {
      await axiosInstance.get("/auth/check");
      return true;
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      if (axiosError?.response?.status === 401) {
        set({ sessionExpired: true });
        toast.error("Authentication Failed");
      } else {
        toast.error("Authentication Error.");
      }
      set({ authUser: null });
      return false;
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  refreshTokens: async (): Promise<void> => {
    try {
      await axiosInstance.post("/auth/refreshToken");
    } catch (error) {
      toast.error("Failed to refresh session. Please log in again.");
      set({ authUser: null });
    }
  },
  clearUserForm: (): void => {
    set({ userForm: null });
  },
  signup: async (
    data: SignUpFormData
  ): Promise<{
    status?: number;
    userForm?: SignUpFormData;
    message?: string;
  }> => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/register", data);
      // Expecting a 202 with userForm and message in response.data
      if (res.status === 202 && res.data?.userForm) {
        set({ userForm: res.data.userForm });
        return {
          status: 202,
          userForm: res.data.userForm,
          message: res.data.message,
        };
      }
      // fallback: if userForm is not present, but status is 202
      if (res.status === 202) {
        set({ userForm: data });
        return {
          status: 202,
          userForm: data,
          message: res.data?.message,
        };
      }
      // fallback: treat as error
      return { message: "Unexpected response from server" };
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      const message =
        axiosError.response?.data?.error?.message ||
        axiosError.response?.data?.message ||
        "An error occurred";
      toast.error(message);
      return { message };
    } finally {
      set({ isSigningUp: false });
    }
  },
  verify: async (code: string): Promise<void> => {
    const { userForm } = get();
    if (!userForm) return;
    set({ isVerifying: true });
    try {
      const res = await axiosInstance.post<AuthUser>("/auth/verification", {
        code,
        userForm,
      });
      set({ authUser: res.data });
      get().clearUserForm();
      get().connectSocket();
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      toast.error(axiosError.response?.data?.message || "Verification failed.");
      set({ isVerifying: false });
    }
  },
  // Add loginGuest for guest login
  loginGuest: async (): Promise<LoginResponse> => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/guestLogin");
      if (res.status === 200 && res.data?.user) {
        const guestUser = res.data.user;
        set({ authUser: guestUser });
        // No socket connection for guest
        return { status: 200, ...guestUser };
      }
      return {
        status: res.status,
        error: res.data?.message || "Guest login failed",
        message: res.data?.message || "Guest login failed",
      };
    } catch (error) {
      toast.error("Guest login failed");
      return {
        status: 400,
        error: "Guest login failed",
        message: "Guest login failed",
      };
    } finally {
      set({ isLoggingIn: false });
    }
  },
  login: async (data): Promise<LoginResponse> => {
    set({ isLoggingIn: true });
    try {
      const fingerprint = await getFingerprint();
      const res = await axiosInstance.post("/auth/login", {
        ...data,
        fingerprint,
      });
      if (res.status === 200 && !res.data.twoFactorRequired) {
        set({ authUser: res.data });
        get().connectSocket();
        return { status: 200, ...res.data };
      }
      if (res.data?.twoFactorRequired) {
        console.log("[AuthStore] 2FA required, returning twoFactorRequired");
        return {
          status: res.status,
          twoFactorRequired: true,
          message: res.data.message,
        };
      }
      return { status: res.status, message: "Unexpected response from server" };
    } catch (error) {
      console.log("[AuthStore] login error:", error);
      const axiosError = error as AxiosError<LoginResponse>;
      // Handle specific error cases
      if (axiosError.response?.status === 403) {
        const details = axiosError.response.data?.details;
        const msg = `Login blocked: Suspicious activity detected from ${
          details?.location || "unknown location"
        }`;
        toast.error(msg);
        return { status: 403, error: msg };
      }
      const errorMessage =
        typeof axiosError.response?.data?.message === "string"
          ? axiosError.response?.data?.message
          : typeof axiosError.response?.data?.error === "string"
          ? axiosError.response?.data?.error
          : "Login failed. Please check your credentials.";
      toast.error(errorMessage);
      return {
        status: axiosError.response?.status || 400,
        error: errorMessage,
        message: errorMessage,
      };
    } finally {
      set({ isLoggingIn: false });
    }
  },
  logout: async (): Promise<void> => {
    set({ isLoggingOut: true });
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      get().disconnectSocket();
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      toast.error(axiosError.response?.data?.message || "Logout failed.");
    } finally {
      set({ isLoggingOut: false });
    }
  },
  updateProfile: async (data: Partial<AuthUser>): Promise<void> => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put<{ user: AuthUser }>(
        "/auth/update-profile",
        data
      );
      const { user } = res.data;
      set({ authUser: { ...get().authUser, ...user } });
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      toast.error(
        axiosError.response?.data?.message || "Profile update failed."
      );
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
  connectSocket: (): void => {
    const { authUser } = get();

    if (!authUser || authUser.isGuest || get().socket?.connected) return;
    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
        token: authUser.socketToken || "",
        clientType: "MCP",
      },
    });
    socket.connect();
    set({ socket: socket });
    socketHandler.handleEvents(socket);
  },
  disconnectSocket: (): void => {
    if (get().socket?.connected) {
      console.log("🔌 [INFO] Disconnecting socket...");
      get().socket?.disconnect();
    }
  },
  initiateEmailChange: async (
    data: SecurityChangeRequest["emailChange"]
  ): Promise<SecurityChangeResponse> => {
    try {
      await axiosInstance.post<SecurityChangeResponse>(
        "/auth/initiate-email-change",
        data
      );
      return { success: true };
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      toast.error(
        axiosError.response?.data?.message || "Failed to initiate email change"
      );
      return { success: false, error: axiosError.response?.data };
    }
  },
  verifyEmailChange: async (
    data: SecurityChangeRequest["verification"]
  ): Promise<SecurityChangeResponse> => {
    try {
      const res = await axiosInstance.post<{ email: string }>(
        "/auth/verify-email-change",
        data
      );
      set((state) => ({
        authUser: state.authUser
          ? { ...state.authUser, email: res.data.email }
          : null,
      }));
      return { success: true, email: res.data.email };
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      toast.error(
        axiosError.response?.data?.message || "Failed to verify email change"
      );
      return { success: false, error: axiosError.response?.data };
    }
  },
  initiatePasswordChange: async (
    data: SecurityChangeRequest["passwordChange"]
  ): Promise<SecurityChangeResponse> => {
    try {
      await axiosInstance.post<SecurityChangeResponse>(
        "/auth/initiate-password-change",
        data
      );
      return { success: true };
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      toast.error(
        axiosError.response?.data?.message ||
          "Failed to initiate password change"
      );
      return { success: false, error: axiosError.response?.data };
    }
  },
  verifyPasswordChange: async (
    data: SecurityChangeRequest["verification"] & { newPassword: string }
  ): Promise<SecurityChangeResponse> => {
    try {
      await axiosInstance.post<SecurityChangeResponse>(
        "/auth/verify-password-change",
        data
      );
      return { success: true };
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      toast.error(
        axiosError.response?.data?.message || "Failed to verify password change"
      );
      return { success: false, error: axiosError.response?.data };
    }
  },
  //--- DELETING ACCOUNT ---
  startDelete: async (data): Promise<startDeleteResponse> => {
    set({ isDeletingProfile: true });
    try {
      const res = await axiosInstance.post("/auth/startDeleteAccount", {
        currentPassword: data.password,
        MFAcode: data.MFAcode, // Always include MFA code if provided
      });
      // Return the full response data, just like login
      return { status: res.status, ...res.data };
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      const message =
        axiosError.response?.data?.message ||
        axiosError.response?.data?.error?.message ||
        "An error occurred";
      toast.error(message);
      return {
        status: axiosError.response?.status || 400,
        twoFactorRequired: false,
        message,
      };
    } finally {
      set({ isDeletingProfile: false });
    }
  },
  verifyDelete: async (
    code: string
  ): Promise<{ success: boolean; message?: string }> => {
    set({ isVerifying: true });
    try {
      await axiosInstance.post("/auth/verifyDeleteAccount", { code });
      set({ authUser: null, isVerifying: false });
      get().clearUserForm();
      get().disconnectSocket();
      return { success: true };
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      toast.error(axiosError.response?.data?.message || "Verification failed.");
      set({ isVerifying: false });
      return { success: false, message: axiosError.response?.data?.message };
    }
  },
  //--- Adding Authenticator ---
  addAuthenticator: async (): Promise<{
    success: boolean;
    message?: string;
    qrCode?: string;
    secret?: string;
    otpauth_url?: string;
    backupCodes?: string[];
  }> => {
    set({ isAddingAuthenticator: true });
    try {
      const res = await axiosInstance.post("/auth/addAuthenticator");
      // Accept and return the data from the backend
      if (res.data && res.status === 200) {
        return {
          success: true,
          qrCode: res.data.qrCode,
          secret: res.data.secret,
          otpauth_url: res.data.otpauth_url,
          backupCodes: res.data.backupCodes,
        };
      }
      return { success: false, message: "Unexpected response from server" };
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      const message =
        axiosError.response?.data?.message ||
        axiosError.response?.data?.error?.message ||
        "An error occurred";
      toast.error(message);
      return { success: false, message };
    } finally {
      set({ isAddingAuthenticator: false });
    }
  },
  enableAuthenticator: async (data: { MFAcode: string }): Promise<boolean> => {
    try {
      const res = await axiosInstance.post("/auth/enableAuthenticator", data);
      if (res.data && res.data.success) {
        toast.success("Authenticator enabled successfully");
        // Optionally update authUser state here if needed
        return true;
      }
      toast.error(res.data?.message || "Failed to enable authenticator");
      return false;
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      const message =
        axiosError.response?.data?.message ||
        axiosError.response?.data?.error?.message ||
        "An error occurred";
      toast.error(message);
      return false;
    }
  },
  removeAuthenticator: async ({
    password,
    MFAcode,
  }: {
    password: string;
    MFAcode: string;
  }): Promise<{ success?: boolean; message?: string }> => {
    try {
      const res = await axiosInstance.post("/auth/removeAuthenticator", {
        currentPassword: password,
        MFAcode,
      });
      if (res.data && res.data.success) {
        toast.success("Authenticator removed successfully");
        // Optionally update authUser state here if needed
        return { success: true, message: res.data.message };
      }
      toast.error(res.data?.message || "Failed to remove authenticator");
      return { success: false, message: res.data?.message };
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      const message =
        axiosError.response?.data?.message ||
        axiosError.response?.data?.error?.message ||
        "An error occurred";
      toast.error(message);
      return { success: false, message };
    }
  },
}));
