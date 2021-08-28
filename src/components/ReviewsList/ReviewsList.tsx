import { useEffect, useState } from "react"
import { fetchReviewsByRestaurantId } from "../../Api"
import { Spin } from "antd";
import ReviewCard from "../ReviewCard/ReviewCard"

interface Review {
    id?: string;
    stars: number;
    date_of_visit: number;
    date_of_comment: number;
    comment: string;
    reply: string;
}


const ReviewsList = ({ restaurantId }) => {

    const [reviews, setReviews] = useState<Review[]>([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const getReviewsById = async () => {
            try {
                setIsLoading(true)
                const response = await fetchReviewsByRestaurantId(restaurantId)
                setReviews(response.reviews)
            } catch (err) {
                console.log(err)
            } finally {
                setIsLoading(false)
            }
        }
        getReviewsById()
    }, [restaurantId])

    return (
        <>
            <h2>User's reviews</h2>
            {isLoading && <Spin style={{ margin: 'auto' }} size="large" />}

            {(reviews || []).map((review) => (
                <ReviewCard review={review} key={review.id} />
            ))}
        </>
    )
}

export default ReviewsList