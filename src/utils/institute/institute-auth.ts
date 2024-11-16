'use client';
import { modules } from '../app-constant';
import { getToken, hasToken, removeToken, setToken } from '../auth';

const type = modules.institutes;

export const setInstituteToken = (token: string): void => {
  return setToken(token, type);
};

export const getInstituteToken = (): string | null => {
  return getToken(type);
};

export const removeInstituteToken = (): void => {
  return removeToken(type);
};

export const hasInstituteToken = (): boolean => {
  return hasToken(type);
};
