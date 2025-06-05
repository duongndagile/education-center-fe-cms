
export const LOCAL_STORAGE_KEY = import.meta.env.VITE_LOCAL_STORAGE_KEY;

export const ACCESS_TOKEN_STORAGE_KEY = `${LOCAL_STORAGE_KEY}_ACCESS_TOKEN`;
export const REFRESH_TOKEN_STORAGE_KEY = `${LOCAL_STORAGE_KEY}_REFRESH_TOKEN`;

export const getAccessToken = (): string | null =>
  localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);

export const getRefreshToken = (): string | null =>
  localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);

export const setAccessToken = (token: string): void => {
  localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, token);
};

export const setRefreshToken = (token: string): void => {
  localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, token);
};

export const clearTokens = (): void => {
  localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
  localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
};
