import { vi, expect, it } from 'vitest';
import { useApiClientStudent } from './api-client-student';
import { useApiClient } from '../api-client';
import { modules } from '@/utils/app-constant';

vi.mock('../api-client', () => ({
  useApiClient: vi.fn(),
}));

it('should call useApiClient with the students module and return the correct value', () => {
  const mockReturnValue = { data: 'some data' };
  (useApiClient as jest.Mock).mockReturnValue(mockReturnValue);
  const result = useApiClientStudent();
  expect(useApiClient).toHaveBeenCalledWith(modules.students);
  expect(result).toEqual(mockReturnValue);
});
