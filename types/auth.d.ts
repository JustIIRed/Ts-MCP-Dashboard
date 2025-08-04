interface AuthUser {
  _id: string;
  email: string;
  username: string;
  displayName?: string;
  profilePic?: string;
  phone?: string;
  createdAt: string;
  MFA_email?: boolean;
  MFA_phone?: boolean;
  MFA_enabled?: boolean;
  isGuest?: boolean;
  socketToken?: string;
}
interface ChangeDialogState {
  isOpen: boolean;
  type: "email" | "password" | null;
}
type MFADialogType = "login" | "startDelete";
type VerifyAuthenticatorDialogFormData = LoginFormData | startDeleteFormData;
interface SignUpFormData {
  username: string;
  email: string;
  password: string;
}
interface LoginFormData {
  email: string;
  password: string;
  MFAcode?: string;
}
interface startDeleteFormData {
  password: string;
  MFAcode?: string;
}
interface AuthStore {
  authUser: AuthUser | null;
  userForm: UserSignUpForm | null;
  isSigningUp: boolean;
  isVerifying: boolean;
  isLoggingIn: boolean;
  isLoggingOut: boolean;
  isUpdatingProfile: boolean;
  isDeletingProfile: boolean;
  isCheckingAuth: boolean;
  isAddingAuthenticator: boolean;
  onlineUsers: string[];
  socket: Socket | null;
  checkAuth: () => Promise<boolean>;
  startDelete: (data: startDeleteFormData) => Promise<startDeleteResponse>;
  verifyDelete: (
    code: string
  ) => Promise<{ success: boolean; message?: string }>;
  keepAuth: () => Promise<boolean>;
  refreshTokens: () => Promise<void>;
  clearUserForm: () => void;
  signup: (data: UserSignUpForm) => Promise<{
    status?: number;
    userForm?: UserSignUpForm;
    message?: string;
  }>;
  verify: (code: string) => Promise<void>;
  login: (data: LoginFormData) => Promise<LoginResponse>;
  loginGuest: () => void;
  addAuthenticator: () => Promise<addAuthenticatorResponse>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<AuthUser>) => Promise<void>;
  connectSocket: () => void;
  disconnectSocket: () => void;
  initiateEmailChange: (
    data: SecurityChangeRequest["emailChange"]
  ) => Promise<SecurityChangeResponse>;
  verifyEmailChange: (
    data: SecurityChangeRequest["verification"]
  ) => Promise<SecurityChangeResponse>;
  initiatePasswordChange: (
    data: SecurityChangeRequest["passwordChange"]
  ) => Promise<SecurityChangeResponse>;
  verifyPasswordChange: (
    data: SecurityChangeRequest["verification"] & { newPassword: string }
  ) => Promise<SecurityChangeResponse>;
  enableAuthenticator: (data: { MFAcode: string }) => Promise<boolean>;
  removeAuthenticator: (data: {
    password: string;
    MFAcode: string;
  }) => Promise<{ success?: boolean; message?: string }>;
  sessionExpired: boolean;
  setSessionExpired: (expired: boolean) => void;
}
