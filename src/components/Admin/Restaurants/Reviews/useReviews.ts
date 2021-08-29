import { IFetchModel } from '../../../../FetchModel';
import { useFetchData } from '../../useFetchData';
import { useCallback } from 'react';
import { fetchReviewsByRestaurantId } from '../../../../Api';
import { Review } from '../../../../../functions/src/reviews/review';

export function useReviews<T extends Review>(restaurantId: string): IFetchModel<T> {
  const loadReviews = useCallback(async ():Promise<T[]> => {
    const response = await fetchReviewsByRestaurantId(restaurantId);
    return response.reviews;
  }, [restaurantId]);

  return useFetchData<T>(loadReviews);
}
