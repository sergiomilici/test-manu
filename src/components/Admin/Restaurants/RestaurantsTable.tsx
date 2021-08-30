import { Restaurant } from '../../../../functions/src/restaurants/restaurant';
import { useMemo } from 'react';
import { Table } from 'antd';
import { getTableColumns } from './tableColumns';

interface IRestaurantsTableProps {
  restaurants: Restaurant[];
  onEditRestaurant: (restaurant: Restaurant) => void;
  onRestaurantRemoved: (restaurant: Restaurant) => void;
}

const mapRestaurantsRows = (restaurants: Restaurant[]) => {
  return restaurants.map(restaurant => ({
    id: restaurant.id,
    name: restaurant.name,
    owner_uid: restaurant.uid,
    city: restaurant.city,
    country: restaurant.country,
    avg_rating: restaurant.avg_rating,
  }))
}

export const RestaurantsTable = ({
                                   restaurants,
                                   onEditRestaurant,
                                   onRestaurantRemoved
                                 }: IRestaurantsTableProps) => {
  const restaurantsRows = useMemo(() => {
    return mapRestaurantsRows(restaurants)
  }, [restaurants])

  return (
    <Table
      size="small"
      pagination={false}
      columns={getTableColumns({onEditRestaurant, onRestaurantRemoved})}
      dataSource={restaurantsRows}
    />)
}
