import { vi, expect, it } from 'vitest';
import { useApiClientInstitute } from './api-client-institute';
import { useApiClient } from '../api-client';
import { modules } from '@/utils/app-constant';

vi.mock('../api-client', () => ({
  useApiClient: vi.fn(),
}));

it('should call useApiClient with the institutes module and return the correct value', () => {
  const mockReturnValue = { data: 'some data' };
  (useApiClient as jest.Mock).mockReturnValue(mockReturnValue);
  const result = useApiClientInstitute();
  expect(useApiClient).toHaveBeenCalledWith(modules.institutes);
  expect(result).toEqual(mockReturnValue);
});
