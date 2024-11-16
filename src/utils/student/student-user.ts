'use client';

import { Student } from '@/interface/modals';
import { getUser, hasUser, removeUser, setUser } from '../user';
import { modules } from '../app-constant';

const type = modules.students;

export const setStudentUser = (user: Student): void => {
  setUser(user, type);
};

export const getStudentUser = (): Student => {
  return getUser(type);
};

export const removeStudentUser = (): void => {
  removeUser(type);
};

export const hasStudentUser = (): boolean => {
  return hasUser(type);
};
