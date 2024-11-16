import { modules } from '@/utils/app-constant';
import { useGetData, useMutateData } from '../useApi';
import { UseMutationResult } from '@tanstack/react-query';

const type = modules.institutes;

export const useInstituteGetData = <T>(
  endpoint: string,
  keys: string[],
  enabled: boolean = true,
) => {
  return useGetData(endpoint, keys, enabled, type);
};

export const useInstituteMutateData = <T>(
  endpoint: string,
  method: string = 'Post',
): UseMutationResult<T, Error, unknown> => {
  return useMutateData(endpoint, method, type);
};
