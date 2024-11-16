import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  setInstituteUser,
  getInstituteUser,
  removeInstituteUser,
  hasInstituteUser,
} from './institute-user';
import { modules } from '../app-constant';
import { Institute } from '@/interface/modals';

const mockStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
};

const type = modules.institutes;

global.localStorage = mockStorage as any;

describe('Institute User Storage Functions', () => {
  const mockInstituteUser: Institute = {
    id: 'id',
    email: 'johndeo@gmail.com',
    first_name: 'john',
    last_name: 'deo',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should set the institute user', () => {
    setInstituteUser(mockInstituteUser);
    expect(mockStorage.setItem).toHaveBeenCalledWith(
      `${type}_user`,
      JSON.stringify(mockInstituteUser),
    );
  });

  it('should get the institute user', () => {
    mockStorage.getItem.mockReturnValueOnce(JSON.stringify(mockInstituteUser));
    const instituteUser = getInstituteUser();
    expect(instituteUser).toEqual(mockInstituteUser);
    expect(mockStorage.getItem).toHaveBeenCalledWith(`${type}_user`);
  });

  it('should remove the institute user', () => {
    removeInstituteUser();
    expect(mockStorage.removeItem).toHaveBeenCalledWith(`${type}_user`);
  });

  it('should check if the institute user exists', () => {
    mockStorage.getItem.mockReturnValueOnce(JSON.stringify(mockInstituteUser));
    const exists = hasInstituteUser();
    expect(exists).toBe(true);
    expect(mockStorage.getItem).toHaveBeenCalledWith(`${type}_user`);
  });

  it('should return false if the institute user does not exist', () => {
    mockStorage.getItem.mockReturnValueOnce(null);
    const exists = hasInstituteUser();
    expect(exists).toBe(false);
    expect(mockStorage.getItem).toHaveBeenCalledWith(`${type}_user`);
  });
});
