import { Restaurant } from '../../../../functions/src/restaurants/restaurant';
import { useMemo } from 'react';
import { Table } from 'antd';
import { getTableColumns } from './tableColumns';

interface IRestaurantsTableProps {
  restaurants: Restaurant[];
  onEditRestaurant: (restaurant: Restaurant) => void;
  onRestaurantRemoved: (restaurant: Restaurant) => void;
  openReviewsModal: (restaurant: Restaurant) => void;
}

const mapRestaurantsRows = (restaurants: Restaurant[]) => {
  return restaurants.map(restaurant => ({
    key: restaurant.id,
    id: restaurant.id,
    name: restaurant.name,
    owner_uid: restaurant.uid,
    uid: restaurant.uid,
    city: restaurant.city,
    country: restaurant.country,
    avg_rating: restaurant.avg_rating,
    highest_rated_review: restaurant.highest_rated_review,
    lowest_rated_review: restaurant.lowest_rated_review,
  }))
}

export const RestaurantsTable = ({
                                   restaurants,
                                   onEditRestaurant,
                                   onRestaurantRemoved,
                                   openReviewsModal
                                 }: IRestaurantsTableProps) => {
  const restaurantsRows = useMemo(() => {
    return mapRestaurantsRows(restaurants)
  }, [restaurants])

  return (
    <Table
      size="small"
      pagination={false}
      columns={getTableColumns({
        onEditRestaurant,
        onRestaurantRemoved,
        openReviewsModal,
      })}
      dataSource={restaurantsRows}
    />)
}
