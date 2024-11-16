import { describe, it, expect, vi } from 'vitest';
import * as auth from '../auth';
import {
  setInstituteToken,
  getInstituteToken,
  removeInstituteToken,
  hasInstituteToken,
} from './institute-auth';
import { modules } from '../app-constant';

vi.mock('../auth', () => ({
  setToken: vi.fn(),
  getToken: vi.fn(),
  removeToken: vi.fn(),
  hasToken: vi.fn(),
}));

const type = modules.institutes;

describe('Institute Token Functions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should set the institute token correctly', () => {
    const token = 'mockToken';
    setInstituteToken(token);
    expect(auth.setToken).toHaveBeenCalledWith(token, type);
  });

  it('should get the institute token correctly', () => {
    const token = 'mockToken';
    (auth.getToken as jest.Mock).mockReturnValue(token);
    const result = getInstituteToken();
    expect(auth.getToken).toHaveBeenCalledWith(type);
    expect(result).toBe(token);
  });

  it('should return null if there is no institute token', () => {
    (auth.getToken as jest.Mock).mockReturnValue(null);
    const result = getInstituteToken();
    expect(result).toBeNull();
  });

  it('should remove the institute token correctly', () => {
    removeInstituteToken();
    expect(auth.removeToken).toHaveBeenCalledWith(type);
  });

  it('should check if institute token exists', () => {
    (auth.hasToken as jest.Mock).mockReturnValue(true);
    const result = hasInstituteToken();
    expect(auth.hasToken).toHaveBeenCalledWith(type);
    expect(result).toBe(true);
  });

  it('should return false if institute token does not exist', () => {
    (auth.hasToken as jest.Mock).mockReturnValue(false);
    const result = hasInstituteToken();
    expect(result).toBe(false);
  });
});
