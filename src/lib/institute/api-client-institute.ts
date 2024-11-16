import { modules } from '@/utils/app-constant';
import { useApiClient } from '../api-client';

export const useApiClientInstitute = () => {
  return useApiClient(modules.institutes);
};
