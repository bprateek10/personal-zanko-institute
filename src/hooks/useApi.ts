import { useApiClient } from '@/lib/api-client';
import {
  useMutation,
  UseMutationResult,
  useQuery,
} from '@tanstack/react-query';

export const useGetData = <T>(
  endpoint: string,
  keys: string[],
  enabled: boolean = true,
  module: string,
) => {
  const { Get } = useApiClient(module);
  return useQuery<T, Error>({
    queryKey: keys,
    queryFn: async () => {
      const response = await Get<T>(endpoint);
      return response.data;
    },
    enabled,
    retry: 0,
  });
};

export const useMutateData = <T>(
  endpoint: string,
  method: string = 'Post',
  module: string,
): UseMutationResult<T, Error, unknown> => {
  const { Post, Put, Delete } = useApiClient(module);

  return useMutation<T, Error, unknown>({
    mutationFn: async (values?: unknown) => {
      switch (method) {
        case 'Delete':
          await Delete(endpoint);
          return {} as T;
        case 'Put':
          if (values) {
            const response = await Put<T>(endpoint, values);
            return response.data;
          }
          throw new Error('PUT request requires values');
        case 'Post':
        default:
          const response = await Post<T>(endpoint, values);
          return response.data;
      }
    },
  });
};
