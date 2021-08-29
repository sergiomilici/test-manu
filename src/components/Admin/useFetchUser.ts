import { IFetchModel } from '../../FetchModel';
import { User } from './Users/User';
import { useCallback } from 'react';
import { getUser } from '../../Api';
import { useFetchData } from './useFetchData';

export function useFetchUser<T extends User>(userId: string): IFetchModel<T> {
  const loadUser = useCallback(async () => {
    const response = await getUser(userId);
    return [response.user];
  }, [userId]);

  return useFetchData<T>(loadUser);
}
