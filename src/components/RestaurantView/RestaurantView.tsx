import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Alert, Button, Divider, Spin } from "antd";
import NavBar from "../NavBar/NavBar";
import ReviewForm from "../ReviewForm/ReviewForm";
import ReviewsList from "../ReviewsList/ReviewsList";
import RestaurantCard from "../RestaurantCard/RetsaurantCard";
import { fetchRestaurantById } from "../../Api";
import { Restaurant } from '../../../functions/src/restaurants/restaurant';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 500px;
  margin: auto;
  padding-bottom: 20px;
`

const RestaurantView = () => {
  const [restaurant, setRestaurant] = useState<undefined | Restaurant>()
  const [isLoading, setIsLoading] = useState(false)
  const [hasErrors, setHasErrors] = useState(false)

  const restaurantId = useParams().id

  useEffect(() => {
    const getRestaurantById = async () => {
      try {
        setIsLoading(true)
        const restaurant = await fetchRestaurantById(restaurantId)
        setRestaurant(restaurant)
      } catch (err) {
        setHasErrors(true)
      } finally {
        setIsLoading(false)
      }
    }
    getRestaurantById()
  }, [restaurantId, hasErrors])

  if (!restaurant && !isLoading) {
    return (
      <div>
        <span>{`Restaurant with id "${restaurantId}" does not exist`}</span>
        <a href="/restaurants">Return to restaurants</a>
      </div>
    )
  }

  return (
    <>
      <NavBar />
      <Wrapper>
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
          message="There was an error while requesting the restaurant information. Please retry."
          style={{marginBottom: '10px',}}
        >
        </Alert>}

        {isLoading &&
        <div style={{marginBottom: '8px', textAlign: 'center',}}><Spin size="large" /></div>}

        {restaurant && (
          <>
            <RestaurantCard restaurant={restaurant} />

            <ReviewForm
              restaurantId={restaurantId}
              onReviewAdded={(restaurant) => {
                setRestaurant(restaurant)
              }} />

            <Divider />

            <ReviewsList restaurant={restaurant} />
          </>
        )}
      </Wrapper>
    </>
  )
}

export default RestaurantView
