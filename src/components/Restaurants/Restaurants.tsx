import { useState, useEffect, useCallback, useMemo } from 'react'
import { Link } from "react-router-dom";
import { List, Spin, Select, Alert, Button, notification } from 'antd';
import { fetchRestaurants } from '../../Api';
import Title from 'antd/es/typography/Title';
import { HomeOutlined, TrophyOutlined } from "@ant-design/icons";
import NavBar from "../NavBar/NavBar";
import { Restaurant } from '../../../functions/src/restaurants/restaurant';
import styled from 'styled-components';
import ReviewReplier from '../ReviewReplier/ReviewReplier';
import RestaurantForm from '../RestaurantForm/RestaurantForm';

const { Option } = Select;

const Wrapper = styled.div`
  padding: 20px;
  text-align: center;
`

// New Owner
// newowner@gmail.com
// owner-password

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasErrors, setHasErrors] = useState(false)

  const [filterRating, setFilterRating] = useState<string>("-1")

  const userRole = "owner"

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


  //if OWNER can see RestaurantForm and own RestaurantsList
  //if 0 restaurants && owner must see RestaurantForm

  // const noRestaurantsMsg  = user? "There are no restaurants matching current filter" owner? Start by adding your first restaurant

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

        {!isLoading && !hasErrors &&
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

        {!isLoading && !hasErrors && userRole === "owner" && <RestaurantForm onRestaurantCreated={(confirmation) => console.log(confirmation)} />}

        {!isLoading && !hasErrors && <List
          itemLayout="vertical"
          locale={{ emptyText: "There are no restaurants matching current filter" }}
          bordered
          dataSource={filteredRestaurants}
          renderItem={(restaurant: any) => (
            <>
              <List.Item
                style={{
                  textAlign: 'left',
                }}
                key={restaurant.id}>
                <HomeOutlined style={{ marginRight: '8px' }} />
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
                <h4 style={{ display: 'block', margin: '0px', marginLeft: 'auto', }}>
                  {restaurant.avg_rating === 0 ? <p><TrophyOutlined /> This restaurant is not rated yet</p> : <p><TrophyOutlined /> Current Rating: {restaurant.avg_rating.toFixed(1)}</p>}
                </h4>
                {userRole === "owner" && <ReviewReplier restaurantId={restaurant.id} />}
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
