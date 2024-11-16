import { modules } from '@/utils/app-constant';
import { useGetData, useMutateData } from '../useApi';
import { UseMutationResult } from '@tanstack/react-query';

const type = modules.students;

export const useStudentGetData = <T>(
  endpoint: string,
  keys: string[],
  enabled: boolean = true,
) => {
  return useGetData(endpoint, keys, enabled, type);
};

export const useStudentMutateData = <T>(
  endpoint: string,
  method: string = 'Post',
): UseMutationResult<T, Error, unknown> => {
  return useMutateData(endpoint, method, type);
};
