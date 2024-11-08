'use client';

import { User } from '@/interface/modals';

const USER_KEY = 'user';

/**
 * Set the user data in localStorage.
 * @param user - The user data to be stored as an object.
 */
export const setUser = (user: User, moduleName: string): void => {
  localStorage.setItem(`${moduleName}_${USER_KEY}`, JSON.stringify(user));
};

/**
 * Get the user data from localStorage.
 * @returns The stored user data object or null if not found.
 */
export const getUser = (module: string): User => {
  const userData = localStorage.getItem(`${module}_${USER_KEY}`);
  return userData ? JSON.parse(userData) : null;
};

/**
 * Remove the user data from localStorage.
 */
export const removeUser = (module: string): void => {
  localStorage.removeItem(`${module}_${USER_KEY}`);
};

/**
 * Check if the user data exists in localStorage.
 * @returns True if the user data exists, false otherwise.
 */
export const hasUser = (module: string): boolean => {
  return getUser(module) !== null;
};
