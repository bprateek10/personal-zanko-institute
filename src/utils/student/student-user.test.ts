import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { modules } from '../app-constant';
import { Student } from '@/interface/modals';
import {
  getStudentUser,
  hasStudentUser,
  removeStudentUser,
  setStudentUser,
} from './student-user';

const mockStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
};

const type = modules.students;

global.localStorage = mockStorage as any;

describe('Student User Storage Functions', () => {
  const mockStudentUser: Student = {
    id: 'id',
    email: 'johndeo@gmail.com',
    first_name: 'john',
    last_name: 'deo',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should set the student user', () => {
    setStudentUser(mockStudentUser);
    expect(mockStorage.setItem).toHaveBeenCalledWith(
      `${type}_user`,
      JSON.stringify(mockStudentUser),
    );
  });

  it('should get the student user', () => {
    mockStorage.getItem.mockReturnValueOnce(JSON.stringify(mockStudentUser));
    const studentUser = getStudentUser();
    expect(studentUser).toEqual(mockStudentUser);
    expect(mockStorage.getItem).toHaveBeenCalledWith(`${type}_user`);
  });

  it('should remove the student user', () => {
    removeStudentUser();
    expect(mockStorage.removeItem).toHaveBeenCalledWith(`${type}_user`);
  });

  it('should check if the student user exists', () => {
    mockStorage.getItem.mockReturnValueOnce(JSON.stringify(mockStudentUser));
    const exists = hasStudentUser();
    expect(exists).toBe(true);
    expect(mockStorage.getItem).toHaveBeenCalledWith(`${type}_user`);
  });

  it('should return false if the student user does not exist', () => {
    mockStorage.getItem.mockReturnValueOnce(null);
    const exists = hasStudentUser();
    expect(exists).toBe(false);
    expect(mockStorage.getItem).toHaveBeenCalledWith(`${type}_user`);
  });
});
