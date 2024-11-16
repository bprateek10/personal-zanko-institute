import { describe, it, expect, vi } from 'vitest';
import * as auth from '../auth';
import { modules } from '../app-constant';
import {
  getStudentToken,
  hasStudentToken,
  removeStudentToken,
  setStudentToken,
} from './student-auth';

vi.mock('../auth', () => ({
  setToken: vi.fn(),
  getToken: vi.fn(),
  removeToken: vi.fn(),
  hasToken: vi.fn(),
}));

const type = modules.students;

describe('Students Token Functions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should set the student token correctly', () => {
    const token = 'mockToken';
    setStudentToken(token);
    expect(auth.setToken).toHaveBeenCalledWith(token, type);
  });

  it('should get the student token correctly', () => {
    const token = 'mockToken';
    (auth.getToken as jest.Mock).mockReturnValue(token);
    const result = getStudentToken();
    expect(auth.getToken).toHaveBeenCalledWith(type);
    expect(result).toBe(token);
  });

  it('should return null if there is no student token', () => {
    (auth.getToken as jest.Mock).mockReturnValue(null);
    const result = getStudentToken();
    expect(result).toBeNull();
  });

  it('should remove the student token correctly', () => {
    removeStudentToken();
    expect(auth.removeToken).toHaveBeenCalledWith(type);
  });

  it('should check if student token exists', () => {
    (auth.hasToken as jest.Mock).mockReturnValue(true);
    const result = hasStudentToken();
    expect(auth.hasToken).toHaveBeenCalledWith(type);
    expect(result).toBe(true);
  });

  it('should return false if student token does not exist', () => {
    (auth.hasToken as jest.Mock).mockReturnValue(false);
    const result = hasStudentToken();
    expect(result).toBe(false);
  });
});
