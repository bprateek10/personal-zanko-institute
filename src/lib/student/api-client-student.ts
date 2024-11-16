import { modules } from '@/utils/app-constant';
import { useApiClient } from '../api-client';

export const useApiClientStudent = () => {
  return useApiClient(modules.students);
};
