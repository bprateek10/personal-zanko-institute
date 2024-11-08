import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useApiClient } from './api-client';
import { getToken, setToken, removeToken } from '@/utils/auth';

vi.mock('@/utils/auth', () => ({
  getToken: vi.fn(),
  setToken: vi.fn(),
  removeToken: vi.fn(),
}));

vi.mock('@/utils/user', () => ({
  removeUser: vi.fn(),
}));

global.fetch = vi.fn();

const mockRouter = {
  push: vi.fn(),
};

const mockQueryClient = {
  removeQueries: vi.fn(),
};

vi.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
}));

vi.mock('@tanstack/react-query', () => ({
  useQueryClient: () => mockQueryClient,
}));

describe('apiClient', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should successfully GET data', async () => {
    const mockResponse = { message: 'Success' };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce(mockResponse),
    });

    const { Get } = useApiClient();
    const response = await Get('/test-endpoint', 'students');

    expect(response).toEqual({ data: mockResponse });
    expect(fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/test-endpoint`,
      expect.any(Object),
    );
  });

  it('should handle 401, refresh token, and retry the original request with dynamic module endpoint', async () => {
    const appModule = 'students';
    const initialResponse = { message: 'Success' };
    const refreshResponse = { access_token: 'newToken' };

    (fetch as jest.Mock).mockResolvedValueOnce({ ok: false, status: 401 });

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce(refreshResponse),
    });

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce(initialResponse),
    });

    (getToken as jest.Mock).mockReturnValueOnce('oldToken');

    const { Get } = useApiClient();
    const response = await Get('/test-endpoint', appModule);

    expect(setToken).toHaveBeenCalledWith('newToken', appModule);
    expect(response).toEqual({ data: initialResponse });

    expect(fetch).toHaveBeenCalledTimes(3);

    expect(fetch).toHaveBeenNthCalledWith(
      1,
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/test-endpoint`,
      expect.any(Object),
    );

    expect(fetch).toHaveBeenNthCalledWith(
      2,
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${appModule}/v1/sessions/refresh`,
      expect.any(Object),
    );

    expect(fetch).toHaveBeenNthCalledWith(
      3,
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/test-endpoint`,
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: 'Bearer newToken',
        }),
      }),
    );
  });

  it('should call removeToken and removeUser on refresh token failure', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: false, status: 401 });
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

    (getToken as jest.Mock).mockReturnValueOnce('oldToken');
    const { Get } = useApiClient();

    await expect(Get('/test-endpoint', 'institutes')).rejects.toThrow();
    expect(removeToken).toHaveBeenCalledWith('institutes');
    expect(mockQueryClient.removeQueries).toHaveBeenCalledWith({
      queryKey: ['me'],
    });
    expect(mockRouter.push).toHaveBeenCalledWith('/login');
  });

  it('should handle 500 Internal Server Error', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: vi.fn().mockResolvedValueOnce({ message: 'Internal Server Error' }),
    });

    const { Get } = useApiClient();

    await expect(Get('/test-endpoint', 'students')).rejects.toEqual({
      status: 500,
      message: 'Internal Server Error: Something went wrong on our end.',
    });
  });

  it('should handle 404 Not Found error', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: vi.fn().mockResolvedValueOnce({ message: 'Not Found' }),
    });

    const { Get } = useApiClient();

    await expect(Get('/test-endpoint', 'students')).rejects.toEqual({
      status: 404,
      message: 'Not Found: The requested resource could not be found.',
    });
  });

  it('should handle unexpected errors', async () => {
    const unexpectedErrorResponse = { message: 'Unexpected Error' };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 418,
      json: vi.fn().mockResolvedValueOnce(unexpectedErrorResponse),
    });

    const { Get } = useApiClient();

    await expect(Get('/test-endpoint', 'students')).rejects.toEqual({
      status: 418,
      message: unexpectedErrorResponse.message || 'An error occurred',
    });
  });

  it('should handle 204 No Content response', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 204,
      json: vi.fn(),
    });

    const { Delete } = useApiClient();
    const response = await Delete('/test-endpoint', 'students');

    expect(response).toEqual({ data: {} });
    expect(fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/test-endpoint`,
      expect.any(Object),
    );
  });
});
