'use client';

import { Institute } from '@/interface/modals';
import { getUser, hasUser, removeUser, setUser } from '../user';
import { modules } from '../app-constant';

const type = modules.institutes;

export const setInstituteUser = (user: Institute): void => {
  setUser(user, type);
};

export const getInstituteUser = (): Institute => {
  return getUser(type);
};

export const removeInstituteUser = (): void => {
  removeUser(type);
};

export const hasInstituteUser = (): boolean => {
  return hasUser(type);
};
