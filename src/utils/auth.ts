'use client';
const TOKEN_KEY = 'token';

/**
 * Set the token in localStorage.
 * @param token - The token to be stored.
 */
export const setToken = (token: string, module: string): void => {
  localStorage.setItem(`${module}_${TOKEN_KEY}`, token);
};

/**
 * Get the token from localStorage.
 * @returns The stored token or null if not found.
 */
export const getToken = (module: string): string | null => {
  return localStorage.getItem(`${module}_${TOKEN_KEY}`);
};

/**
 * Remove the token from localStorage.
 */
export const removeToken = (module: string): void => {
  localStorage.removeItem(`${module}_${TOKEN_KEY}`);
};

/**
 * Check if the token exists in localStorage.
 * @returns True if the token exists, false otherwise.
 */
export const hasToken = (module: string): boolean => {
  return getToken(module) !== null;
};
