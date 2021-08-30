import { useLoadRestaurants } from './useLoadRestaurants';
import { Restaurant } from '../../../../functions/src/restaurants/restaurant';
import { Input, Spin } from 'antd';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { matchString } from '../../../utils/RegExpUtils';
import { RestaurantsTable } from './RestaurantsTable';

export const Restaurants = () => {
  const [filterRestaurantText, setFilterRestaurantText] = useState<string>('');
  const {isLoading, data, error, removeData} = useLoadRestaurants<Restaurant>();
  const restaurants = data;

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter(u => matchString(filterRestaurantText, u.name))
      .sort(function compare(res1, res2) {
        if (res1.uid < res2.uid) {
          return -1;
        }
        if (res1.name > res2.uid) {
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
      {isLoading && (<Spin />)}
      {!isLoading && (
        <>
          <Input placeholder="Filter restaurants"
                 onChange={onSearch}
                 style={{width: '100%', marginBottom: '20px'}}
          />
          <RestaurantsTable
            restaurants={filteredRestaurants}
            onRestaurantRemoved={removeData}
            onEditRestaurant={e => console.log(e)}
          />
        </>)
      }
    </>
  )
}
