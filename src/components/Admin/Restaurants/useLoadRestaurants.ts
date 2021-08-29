import { useCallback } from 'react';
import { fetchRestaurants } from '../../../Api';
import { IFetchModel } from '../../../FetchModel';
import { useFetchData } from '../useFetchData';
import { Restaurant } from '../../../../functions/src/restaurants/restaurant';

export function useLoadRestaurants<T extends Restaurant>(): IFetchModel<T> {
  const loadRestaurants = useCallback(async (): Promise<T[]> => {
    const response = await fetchRestaurants();
    return response.restaurants;
  }, []);

  return useFetchData<T>(loadRestaurants);
}
