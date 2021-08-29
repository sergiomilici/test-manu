import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Restaurant } from '../../../../functions/src/restaurants/restaurant';
import { RemoveRestaurant } from './RemoveRestaurant';

const IconsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

interface IGetTableProps {
  onEditRestaurant: (user: Restaurant) => void;
  onRestaurantRemoved: (user: Restaurant) => void;
  openReviewsModal: (restaurant: Restaurant) => void
}

export const getTableColumns = ({
                                  onEditRestaurant,
                                  onRestaurantRemoved,
                                  openReviewsModal
                                }: IGetTableProps) => ([
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Owner ID',
    dataIndex: 'owner_uid',
    key: 'owner_uid',
  },
  {
    title: 'City',
    key: 'city',
    dataIndex: 'city',
  },
  {
    title: 'Country',
    key: 'country',
    dataIndex: 'country',
  },
  {
    title: 'Average Rating',
    key: 'avg_rating',
    dataIndex: 'avg_rating',
  },
  {
    title: 'Reviews',
    key: 'see_reviews',
    render: (text, restaurant) => {
      const hasReviews = !!restaurant.highest_rated_review || !!restaurant.lowest_rated_review;
      if (!hasReviews) {
        return <span>No reviews</span>
      }
      return (
        <a href="#reviews" onClick={e => {
          e.preventDefault();
          openReviewsModal(restaurant);
        }}>See Reviews</a>
      )
    }
  },
  {
    title: 'Actions',
    key: 'actions',
    render: (text, restaurant) => {
      return (
        <IconsWrapper>
          <RemoveRestaurant
            restaurant={restaurant}
            onRemoveRestaurant={() => onRestaurantRemoved(restaurant)}
          />
          <Button shape="circle" icon={<EditOutlined />}
                  onClick={() => onEditRestaurant(restaurant)} />
        </IconsWrapper>
      )
    }
  }
]);
