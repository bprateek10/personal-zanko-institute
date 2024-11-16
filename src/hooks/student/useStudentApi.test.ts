import { renderHook, act } from '@testing-library/react';
import { useGetData, useMutateData } from '../useApi';
import { vi } from 'vitest';
import { useStudentGetData, useStudentMutateData } from './useStudentApi';
import { modules } from '@/utils/app-constant';

vi.mock('../useApi', () => ({
  useGetData: vi.fn(),
  useMutateData: vi.fn(),
}));
const type = modules.students;

describe('useStudentGetData', () => {
  it('should call useGetData with the correct parameters', async () => {
    const mockGetData = vi
      .fn()
      .mockReturnValue({
        data: { id: 1, name: 'Student A' },
        isLoading: false,
      });
    (useGetData as jest.Mock).mockImplementation(mockGetData);

    const { result } = renderHook(() =>
      useStudentGetData('/api/student', ['studentId'], true),
    );
    expect(mockGetData).toHaveBeenCalledWith(
      '/api/student',
      ['studentId'],
      true,
      type,
    );
    expect(result.current.data).toEqual({ id: 1, name: 'Student A' });
    expect(result.current.isLoading).toBe(false);
  });
});

describe('useStudentMutateData', () => {
  it('should call useMutateData with the correct parameters and invoke mutate', async () => {
    const mockMutateData = vi.fn().mockReturnValue({
      mutate: vi.fn(),
    });
    (useMutateData as jest.Mock).mockImplementation(mockMutateData);
    const { result } = renderHook(() =>
      useStudentMutateData('/api/student', 'POST'),
    );
    expect(mockMutateData).toHaveBeenCalledWith('/api/student', 'POST', type);

    const { mutate } = result.current;
    expect(typeof mutate).toBe('function');
    const mockPayload = { name: 'Student B' };
    await act(async () => {
      mutate(mockPayload);
    });
    expect(mutate).toHaveBeenCalledWith(mockPayload);
  });
});
