import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spin } from "antd";
import NavBar from "../NavBar/NavBar";
import ReviewForm from "../ReviewForm/ReviewForm";
import ReviewsList from "../ReviewsList/ReviewsList";
import RestaurantCard from "../RestaurantCard/RetsaurantCard";
import { fetchRestaurantById } from "../../Api";

interface Review {
    id?: string;
    stars: number;
    date_of_visit: number;
    date_of_comment: number;
    comment: string;
    reply: string;
}

interface Restaurant {
    id?: string;
    uid: string; // user id
    name: string;
    city: string;
    country: string;
    avg_rating: number;
    highest_rated_review: Review;
    lowest_rated_review: Review;
}

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

            <div
                style={{
                    width: '500px',
                    margin: 'auto',
                    paddingBottom: '20px',
                }}
            >
                {isLoading && <Spin style={{ margin: 'auto' }} size="large" />}

                <RestaurantCard restaurant={restaurant} />

                <ReviewForm
                    restaurantId={restaurantId}
                    onReviewAdded={(restaurant) => { setRestaurant(restaurant) }} />

                <ReviewsList restaurantId={restaurantId} />

            </div>
        </>
    )
}

export default RestaurantView