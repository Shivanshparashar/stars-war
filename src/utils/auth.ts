export const login = async (username: string, password: string): Promise<string | null> => {
  // Fake credentials
  if (username === 'admin' && password === 'password') {
    return 'mock-jwt-token-' + Date.now();
  }
  return null;
};

export const refreshToken = (): string => {
  return 'refreshed-mock-jwt-token-' + Date.now();
};