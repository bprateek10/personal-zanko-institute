import { describe, it, expect, beforeEach } from 'vitest';
import { setUser, getUser, removeUser, hasUser } from './user';

const MODULE_NAME: string = 'testModule';
const USER_KEY = `${MODULE_NAME}_user`;

describe('User Storage Functions', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should set user data in localStorage', () => {
    const user = {
      id: '1',
      email: 'johndeo@gmail.com',
      first_name: 'john',
      last_name: 'deo',
    };
    setUser(user, MODULE_NAME);

    const storedUser = localStorage.getItem(USER_KEY);
    expect(storedUser).toBe(JSON.stringify(user));
  });

  it('should get user data from localStorage', () => {
    const user = {
      id: '1',
      email: 'johndeo@gmail.com',
      first_name: 'john',
      last_name: 'deo',
    };
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    const retrievedUser = getUser(MODULE_NAME);
    expect(retrievedUser).toEqual(user);
  });

  it('should return null if no user data exists', () => {
    const retrievedUser = getUser(MODULE_NAME);
    expect(retrievedUser).toBeNull();
  });

  it('should remove user data from localStorage', () => {
    const user = {
      id: '1',
      email: 'johndeo@gmail.com',
      first_name: 'john',
      last_name: 'deo',
    };
    setUser(user, MODULE_NAME);
    removeUser(MODULE_NAME);
    const retrievedUser = getUser(MODULE_NAME);
    expect(retrievedUser).toBeNull();
  });

  it('should check if user data exists', () => {
    expect(hasUser(MODULE_NAME)).toBe(false);
    const user = {
      id: '1',
      email: 'johndeo@gmail.com',
      first_name: 'john',
      last_name: 'deo',
    };
    setUser(user, MODULE_NAME);
    expect(hasUser(MODULE_NAME)).toBe(true);
  });
});
