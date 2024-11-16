'use client';

import { ApiError } from '@/interface/common';
import { getToken, removeToken, setToken } from '@/utils/auth';
import { removeUser } from '@/utils/user';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { modules } from '@/utils/app-constant';
interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

const getTokenValue = (module: string): string | null => {
  const token = getToken(module);
  return token ? token : null;
};

const apiClient = async <T>(
  endpoint: string,
  method: HttpMethod = 'GET',
  body: unknown = null,
  router: ReturnType<typeof useRouter>,
  queryClient: ReturnType<typeof useQueryClient>,
  module: string,
): Promise<ApiResponse<T>> => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  let token = getTokenValue(module);
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const refreshToken = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${module}/v1/sessions/refresh`,
        {
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        },
      );

      if (!response.ok) {
        throw new Error('Unauthorized: Please log in again.');
      }

      const res = await response.json();
      const newToken = res.access_token;
      setToken(newToken, module);
      return newToken;
    } catch (err) {
      removeToken(module);
      removeUser(module);
      queryClient.removeQueries({ queryKey: ['me'] });
      if (module === modules.institutes) {
        router.push('/login');
      } else {
        router.push('/student-portal/signin');
      }

      throw err;
    }
  };

  const options: RequestInit = {
    method,
    headers,
    credentials: 'include',
    body: body ? JSON.stringify(body) : null,
  };

  try {
    let response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`,
      options,
    );

    if (response.status === 401) {
      if (
        (method !== 'POST' && endpoint !== `/api/${module}/v1/sessions`) ||
        (method === 'DELETE' && endpoint === `/api/${module}/v1/sessions`)
      ) {
        token = await refreshToken();
        headers['Authorization'] = `Bearer ${token}`;

        response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`,
          { ...options, headers },
        );
      }
    }

    if (!response.ok) {
      const errorResponse: ApiResponse = await response.json();
      const errorStatusCode = response.status;
      let errorMessage: string;

      switch (errorStatusCode) {
        case 401:
          errorMessage = 'Unauthorized: Please log in again.';
          break;
        case 403:
          errorMessage =
            'Forbidden: You do not have permission to access this resource.';
          break;
        case 404:
          errorMessage =
            'Not Found: The requested resource could not be found.';
          break;
        case 500:
          errorMessage =
            'Internal Server Error: Something went wrong on our end.';
          break;
        default:
          errorMessage = errorResponse.message || 'An error occurred';
      }

      throw { status: errorStatusCode, message: errorMessage } as ApiError;
    }

    if (response.status === 204) {
      return { data: {} as T };
    }

    return { data: await response.json() };
  } catch (error) {
    throw error;
  }
};

export const useApiClient = (module: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return {
    Get: <T>(endpoint: string): Promise<ApiResponse<T>> =>
      apiClient<T>(endpoint, 'GET', null, router, queryClient, module),
    Post: <T>(endpoint: string, body: unknown): Promise<ApiResponse<T>> =>
      apiClient<T>(endpoint, 'POST', body, router, queryClient, module),
    Put: <T>(endpoint: string, body: unknown): Promise<ApiResponse<T>> =>
      apiClient<T>(endpoint, 'PUT', body, router, queryClient, module),
    Delete: <T>(endpoint: string): Promise<ApiResponse<T>> =>
      apiClient<T>(endpoint, 'DELETE', null, router, queryClient, module),
  };
};

export default apiClient;
