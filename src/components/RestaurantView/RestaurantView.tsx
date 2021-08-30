import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spin } from "antd";
import NavBar from "../NavBar/NavBar";
import ReviewForm from "../ReviewForm/ReviewForm";
import ReviewsList from "../ReviewsList/ReviewsList";
import RestaurantCard from "../RestaurantCard/RetsaurantCard";
import { fetchRestaurantById } from "../../Api";
import { Restaurant } from '../../../functions/src/restaurants/restaurant';
import styled from 'styled-components';

const Wrapper = styled.div`
width:500px;
margin: auto;
padding-bottom: 20px;
`

const RestaurantView = () => {

    const [restaurant, setRestaurant] = useState<undefined | Restaurant>()
    const [isLoading, setIsLoading] = useState(false)

    const restaurantId = useParams().id

    useEffect(() => {
        const getRestaurantById = async () => {
            try {
                setIsLoading(true)
                const restaurant = await fetchRestaurantById(restaurantId)
                setRestaurant(restaurant)
            } catch (err) {
                console.log(err)
            } finally {
                setIsLoading(false)
            }
        }
        getRestaurantById()
    }, [restaurantId])

    if (!restaurant) {
        return null
    }

    return (
        <>
            <NavBar />
            <Wrapper>
                {isLoading && <div style={{ marginBottom: '8px', textAlign: 'center', }}><Spin size="large" /></div>}
                <RestaurantCard restaurant={restaurant} />
                <ReviewForm
                    restaurantId={restaurantId}
                    onReviewAdded={(restaurant) => { setRestaurant(restaurant) }} />

                <ReviewsList restaurant={restaurant} />
            </Wrapper>
        </>
    )
}

export default RestaurantView