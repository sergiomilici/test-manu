import { useLoadRestaurants } from './useLoadRestaurants';
import { Restaurant } from '../../../../functions/src/restaurants/restaurant';

import { Input, notification } from 'antd';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { matchString } from '../../../utils/RegExpUtils';
import { RestaurantsTable } from './RestaurantsTable';
import { UpdateRestaurantModal } from './UpdateRestaurantModal';
import { EditReviewsModal } from './Reviews/EditReviewsModal';
import { Loader } from '../../Loader';

export const Restaurants = () => {
  const [filterRestaurantText, setFilterRestaurantText] = useState<string>('');
  const {isLoading, data, removeElement, replaceElement} = useLoadRestaurants<Restaurant>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isReviewsModalOpen, setReviewsIsModalOpen] = useState<boolean>(false);
  const [editingRestaurant, setEditingRestaurant] = useState<Restaurant | null>(null);
  const restaurants = data;

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter(u => matchString(filterRestaurantText, u.name))

      .sort(function compare(res1: Restaurant, res2: Restaurant) {
        if (res1.id! < res2.id!) {
          return -1;
        }
        if (res1.id! > res2.id!) {
          return 1;
        }
        return 0;
      });
  }, [restaurants, filterRestaurantText])

  const onSearch = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setFilterRestaurantText(event.target.value || '');
  }, [restaurants])

  return (
    <>
      {isLoading && (<Loader />)}
      {!isLoading && (
        <>
          <Input placeholder="Filter restaurants"
                 onChange={onSearch}
                 style={{width: '100%', marginBottom: '20px'}}
          />
          <RestaurantsTable
            restaurants={filteredRestaurants}
            onRestaurantRemoved={removeElement}
            onEditRestaurant={restaurant => {
              setEditingRestaurant(restaurant);
              setIsModalOpen(true);
            }}
            openReviewsModal={(restaurant: Restaurant) => {
              setEditingRestaurant(restaurant);
              setReviewsIsModalOpen(true);
            }}
          />
          {editingRestaurant && (
            <UpdateRestaurantModal
              isModalOpen={isModalOpen}
              restaurant={editingRestaurant}
              onClose={() => {
                console.log('onClose');
                setIsModalOpen(false);
                setEditingRestaurant(null);
              }}
              onRestaurantEdited={(restaurant: Restaurant) => {
                replaceElement(restaurant);
                setIsModalOpen(false);
                setEditingRestaurant(null);
                notification.success({
                  message: 'Success!!',
                  description:
                    `The restaurant "${restaurant.name}" was updated correctly.`,
                })
              }} />
          )}
          {isReviewsModalOpen && editingRestaurant && (
            <EditReviewsModal
              restaurantId={editingRestaurant.id!}
              isModalOpen={isReviewsModalOpen}
              onClose={() => {
                setReviewsIsModalOpen(false);
              }}
            />
          )}
        </>)
      }
    </>
  )
}
