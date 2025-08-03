interface LoginResponse {
  status: number;
  error?: string;
  message?: string;
  twoFactorRequired?: boolean;
  details?: {
    location?: string;
    device?: string;
  };
  user?: AuthUser;
}
interface startDeleteResponse {
  status: number;
  error?: string;
  message?: string;
  twoFactorRequired?: boolean;
}
interface SecurityChangeResponse {
  success: boolean;
  message?: string;
  email?: string;
  error?: ApiError;
}
interface LoginErrorResponse {
  error?: string;
  message?: string;
  details?: {
    location?: string;
    device?: string;
  };
}
interface SubscriptionResponse {
  id?: string;
  error?: string;
}
interface addAuthenticatorResponse {
  success: boolean;
  qrCode?: string;
  secret?: string;
  otpauth_url?: string;
  backupCodes?: string[];
  message?: string;
}
