import { renderHook, act } from '@testing-library/react';
import { useInstituteGetData, useInstituteMutateData } from './useInstituteApi';
import { useGetData, useMutateData } from '../useApi';
import { vi } from 'vitest';
import { modules } from '@/utils/app-constant';

vi.mock('../useApi', () => ({
  useGetData: vi.fn(),
  useMutateData: vi.fn(),
}));
const type = modules.institutes;

describe('useInstituteGetData', () => {
  it('should call useGetData with the correct parameters', async () => {
    const mockGetData = vi
      .fn()
      .mockReturnValue({
        data: { id: 1, name: 'Institute A' },
        isLoading: false,
      });
    (useGetData as jest.Mock).mockImplementation(mockGetData);

    const { result } = renderHook(() =>
      useInstituteGetData('/api/institute', ['instituteId'], true),
    );
    expect(mockGetData).toHaveBeenCalledWith(
      '/api/institute',
      ['instituteId'],
      true,
      type,
    );
    expect(result.current.data).toEqual({ id: 1, name: 'Institute A' });
    expect(result.current.isLoading).toBe(false);
  });
});

describe('useInstituteMutateData', () => {
  it('should call useMutateData with the correct parameters and invoke mutate', async () => {
    const mockMutateData = vi.fn().mockReturnValue({
      mutate: vi.fn(),
    });
    (useMutateData as jest.Mock).mockImplementation(mockMutateData);
    const { result } = renderHook(() =>
      useInstituteMutateData('/api/institute', 'POST'),
    );
    expect(mockMutateData).toHaveBeenCalledWith('/api/institute', 'POST', type);

    const { mutate } = result.current;
    expect(typeof mutate).toBe('function');
    const mockPayload = { name: 'Institute B' };
    await act(async () => {
      mutate(mockPayload);
    });
    expect(mutate).toHaveBeenCalledWith(mockPayload);
  });
});
