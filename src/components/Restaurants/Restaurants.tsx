import { useContext, useState, useEffect, useCallback, useMemo } from 'react'
import { Link } from "react-router-dom";
import { List, Spin, Select, Alert, Button, notification } from 'antd';
import { fetchRestaurants } from '../../Api';
import Title from 'antd/es/typography/Title';
import { HomeOutlined, StarOutlined } from "@ant-design/icons";
import NavBar from "../NavBar/NavBar";
import { Restaurant } from '../../../functions/src/restaurants/restaurant';
import styled from 'styled-components';
import ReviewReplier from '../ReviewReplier/ReviewReplier';
import RestaurantForm from '../RestaurantForm/RestaurantForm';
import { AuthContext } from "../Auth/Auth";

const { Option } = Select;

const Wrapper = styled.div`
  padding: 20px;
  text-align: center;
`

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasErrors, setHasErrors] = useState(false)

  const [filterRating, setFilterRating] = useState<string>("-1")

  const { isUser } = useContext(AuthContext)
  const { isOwner } = useContext(AuthContext)
  const { isAdmin } = useContext(AuthContext)

  useEffect(() => {
    const getRestaurants = async () => {
      try {
        setIsLoading(true)
        const response = await fetchRestaurants()
        setRestaurants(response.restaurants)
      } catch (err) {
        setHasErrors(true)
        notification.error({
          message: 'Error',
          description:
            err.message
        });
      } finally {
        setIsLoading(false)
      }
    }

    getRestaurants()
  }, [hasErrors])

  const filteredRestaurants = useMemo(() => {

    if (filterRating === "-1") {
      return restaurants.sort((r1, r2) => r2.avg_rating - r1.avg_rating);
    } else {
      return restaurants
        .filter(r => Math.floor(r.avg_rating).toString() === filterRating)
        .sort((r1, r2) => r2.avg_rating - r1.avg_rating);
    }

  }, [restaurants, filterRating])

  const handleFilter = useCallback((value: string) => {
    setFilterRating(value)
  }, [])


  return (
    <>
      <NavBar />
      <Wrapper>

        <Title>Restaurants List</Title>

        {isLoading && <Spin style={{ margin: 'auto' }} size="large" />}

        {hasErrors &&
          <Alert
            showIcon
            action={
              <Button
                type="primary"
                onClick={() => setHasErrors(false)}
              >Retry</Button>
            }
            type="error"
            message="There was an error during your request or you are not authorized to access this resource"
            style={{ marginBottom: '10px', }}
          >
          </Alert>}

        {!isLoading && !hasErrors && isUser &&
          <Select
            defaultValue="-1"
            style={{ width: 200, display: 'block', marginBottom: '10px', }}
            onChange={handleFilter}>
            <Option value="-1">All restaurants</Option>
            <Option value="0">Not rated yet</Option>
            <Option value="1">1 Star</Option>
            <Option value="2">2 Stars</Option>
            <Option value="3">3 Stars</Option>
            <Option value="4">4 Stars</Option>
            <Option value="5">5 Stars</Option>
          </Select>}

        {!isLoading && !hasErrors && isOwner && <RestaurantForm onRestaurantCreated={(restaurant) => setRestaurants([...restaurants, restaurant])} />}

        {!isLoading && !hasErrors && <List
          itemLayout="vertical"
          locale={{ emptyText: "There are no restaurants." }}
          bordered
          dataSource={filteredRestaurants}
          renderItem={(restaurant: any) => (
            <>
              <List.Item
                style={{
                  textAlign: 'left',
                }}
                key={restaurant.id}>
                <HomeOutlined style={{ marginRight: '5px' }} />
                <Link
                  style={{
                    color: 'inherit',
                    textDecoration: 'underline',
                  }}
                  to={{
                    pathname: `/restaurant/${restaurant.id}`,
                  }}
                >
                  <h3 style={{ fontSize: '20px', display: 'inline', }}>{restaurant.name}</h3>
                </Link>
                {<p style={{ marginTop: '15px', fontSize: '15px' }}><StarOutlined /> {restaurant.avg_rating === 0 ? 'This restaurant is not rated yet' : `Current rating: ${restaurant.avg_rating.toFixed(1)}`} </p>}
                {isOwner && <ReviewReplier restaurantId={restaurant.id} />}
              </List.Item>
            </>
          )
          }
        />}
      </Wrapper>
    </>
  )
}

export default Restaurants
