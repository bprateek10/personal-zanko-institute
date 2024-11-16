import { useApiClient } from '@/lib/api-client';
import { renderHook, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { useGetData, useMutateData } from './useApi';
import Providers from '@/utils/Provider';

vi.mock('@/lib/api-client', () => ({
  useApiClient: vi.fn(),
}));

describe('useApi', () => {
  const mockGet = vi.fn();
  const mockPost = vi.fn();
  const mockPut = vi.fn();
  const mockDelete = vi.fn();

  beforeEach(() => {
    mockGet.mockClear();
    mockPost.mockClear();
    mockPut.mockClear();
    mockDelete.mockClear();
    (useApiClient as jest.Mock).mockReturnValue({
      Get: mockGet,
      Post: mockPost,
      Put: mockPut,
      Delete: mockDelete,
    });
  });

  describe('useGetData', () => {
    const mockGet = vi.fn();

    beforeEach(() => {
      mockGet.mockClear();
      (useApiClient as jest.Mock).mockReturnValue({ Get: mockGet });
    });

    it('should call Get with the correct endpoint and return data', async () => {
      const endpoint = '/api/data';
      const keys = ['data', endpoint];
      const mockResponse = { data: { id: 1, name: 'test' } };

      mockGet.mockResolvedValue(mockResponse);

      const { result } = renderHook(
        () => useGetData(endpoint, keys, true, 'students'),
        {
          wrapper: Providers,
        },
      );

      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(mockGet).toHaveBeenCalledWith(endpoint);
      expect(result.current.data).toEqual(mockResponse.data);
    });

    it('should handle errors gracefully', async () => {
      const endpoint = '/api/data';
      const keys = ['data', endpoint];
      const errorMessage = 'Fetch failed';

      mockGet.mockRejectedValue(new Error(errorMessage));

      const { result } = renderHook(
        () => useGetData(endpoint, keys, true, 'students'),
        {
          wrapper: Providers,
        },
      );

      await waitFor(() => expect(result.current.isError).toBe(true));

      expect(result.current.error).toEqual(new Error(errorMessage));
    });

    it('should not fetch data if enabled is false', async () => {
      const endpoint = '/api/data';
      const keys = ['data', endpoint];

      const { result } = renderHook(
        () => useGetData(endpoint, keys, false, 'students'),
        {
          wrapper: Providers,
        },
      );

      expect(result.current.isLoading).toBe(false);
    });
  });

  describe('useMutateData', () => {
    it('should perform a POST request successfully', async () => {
      const endpoint = '/api/data';
      const mockResponse = { id: 1, name: 'Test' };
      mockPost.mockResolvedValueOnce({ data: mockResponse });

      const { result } = renderHook(
        () => useMutateData<typeof mockResponse>(endpoint, 'Post', 'students'),
        {
          wrapper: Providers,
        },
      );

      await act(async () => {
        await result.current.mutate({ name: 'Test' });
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });
      expect(mockPost).toHaveBeenCalledWith(endpoint, { name: 'Test' });
      expect(result.current.data).toEqual(mockResponse);
    });

    it('should perform a PUT request successfully', async () => {
      const endpoint = '/api/data/1';
      const mockResponse = { id: 1, name: 'Updated Test' };
      mockPut.mockResolvedValueOnce({ data: mockResponse });

      const { result } = renderHook(
        () => useMutateData<typeof mockResponse>(endpoint, 'Put', 'students'),
        {
          wrapper: Providers,
        },
      );

      await act(async () => {
        await result.current.mutate({ name: 'Updated Test' });
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });
      expect(mockPut).toHaveBeenCalledWith(endpoint, { name: 'Updated Test' });
      expect(result.current.data).toEqual(mockResponse);
    });

    it('should perform a DELETE request successfully', async () => {
      const endpoint = '/api/data/1';
      mockDelete.mockResolvedValueOnce({ data: {} });

      const { result } = renderHook(
        () => useMutateData<{}>(endpoint, 'Delete', 'students'),
        {
          wrapper: Providers,
        },
      );

      await act(async () => {
        await result.current.mutate({});
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });
      expect(mockDelete).toHaveBeenCalledWith(endpoint);
      expect(result.current.data).toEqual({});
    });
  });
});
