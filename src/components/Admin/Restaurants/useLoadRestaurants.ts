import { useEffect, useState } from 'react';
import { fetchRestaurants } from '../../../Api';
import { IFetchModel } from '../../../FetchModel';

export function useLoadRestaurants<T>(): IFetchModel<T> {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any | undefined>();
  const [restaurants, setRestaurants] = useState<T[]>([])

  useEffect(() => {
    const loadRestaurants = async () => {
      try {
        setIsLoading(true);
        setError(undefined);
        const response = await fetchRestaurants();
        setRestaurants(response.restaurants)
      } catch (e) {
        console.error(e);
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    }
    loadRestaurants();
  }, [])

  const removeElement = (restaurant: T) => {
    // @ts-ignore
    const updatedRestaurants = restaurants.filter(r => r.id !== restaurant.id);
    setRestaurants(updatedRestaurants)
  }

  return {
    isLoading,
    data: restaurants,
    error,
    removeData: removeElement,
  }
}
