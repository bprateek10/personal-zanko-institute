'use client';
import { modules } from '../app-constant';
import { getToken, hasToken, removeToken, setToken } from '../auth';

const type = modules.students;

export const setStudentToken = (token: string): void => {
  return setToken(token, type);
};

export const getStudentToken = (): string | null => {
  return getToken(type);
};

export const removeStudentToken = (): void => {
  return removeToken(type);
};

export const hasStudentToken = (): boolean => {
  return hasToken(type);
};
