import { useEffect, useState } from "react"
import { fetchReviewsByRestaurantId } from "../../Api"
import { Spin, notification } from "antd";
import ReviewCard from "../ReviewCard/ReviewCard"
import { Review } from "../../../functions/src/reviews/review"

const ReviewsList = ({ restaurant }) => {

    const [reviews, setReviews] = useState<Review[]>([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const getReviewsById = async () => {
            try {
                setIsLoading(true)
                const response = await fetchReviewsByRestaurantId(restaurant.id)
                setReviews(response.reviews)
            } catch (err) {
                notification.error({
                    message: 'Error',
                    description:
                        'There was an error trying to load the reviews. Please retry.'
                });
            } finally {
                setIsLoading(false)
            }
        }
        getReviewsById()
    }, [restaurant])

    return (
        <>
            {isLoading &&
                <div style={{ textAlign: 'center', }}>
                    <Spin size="large" />
                </div>}

            {!isLoading && <>
                <h2>{reviews.length === 0 ? 'There are currently no reviews for this restaurant.' : 'Reviews from users'}</h2>
                {(reviews || []).map((review) => (
                    <ReviewCard review={review} key={review.id} />
                ))}
            </>}

        </>
    )
}

export default ReviewsList