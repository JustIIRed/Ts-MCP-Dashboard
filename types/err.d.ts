interface ApiError {
  message: string;
  status?: number;
  error?: {
    message: string;
  };
}
