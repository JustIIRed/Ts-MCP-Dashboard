interface SecurityChangeRequest {
  emailChange: {
    currentPassword: string;
    newEmail: string;
  };
  passwordChange: {
    currentPassword: string;
    newPassword: string;
  };
  verification: {
    code: string;
    newPassword?: string;
  };
}
