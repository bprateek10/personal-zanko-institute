import { describe, it, expect, beforeEach } from 'vitest';
import { getToken, hasToken, removeToken, setToken } from './auth';

describe('Token Manager', () => {
  const TOKEN_KEY = 'token';
  const appModule = 'testModule';
  const tokenKeyWithModule = `${appModule}_${TOKEN_KEY}`;

  beforeEach(() => {
    localStorage.clear();
  });

  it('should set the token in localStorage with module prefix', () => {
    const token = 'test_token';
    setToken(token, appModule);
    expect(localStorage.getItem(tokenKeyWithModule)).toBe(token);
  });

  it('should get the token from localStorage with module prefix', () => {
    const token = 'test_token';
    localStorage.setItem(tokenKeyWithModule, token);
    expect(getToken(appModule)).toBe(token);
  });

  it('should return null if token is not found for given module', () => {
    expect(getToken(appModule)).toBeNull();
  });

  it('should remove the token from localStorage with module prefix', () => {
    const token = 'test_token';
    localStorage.setItem(tokenKeyWithModule, token);
    removeToken(appModule);
    expect(localStorage.getItem(tokenKeyWithModule)).toBeNull();
  });

  it('should check if the token exists for given module', () => {
    const token = 'test_token';
    expect(hasToken(appModule)).toBe(false);
    localStorage.setItem(tokenKeyWithModule, token);
    expect(hasToken(appModule)).toBe(true);
  });
});
