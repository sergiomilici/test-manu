import { useEffect, useState } from "react"
import { fetchReviewsByRestaurantId } from "../../Api"
import { Spin, Alert, Button } from "antd";
import ReviewCard from "../ReviewCard/ReviewCard"
import { Review } from "../../../functions/src/reviews/review"

const ReviewsList = ({ restaurant }) => {

    const [reviews, setReviews] = useState<Review[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [hasErrors, setHasErrors] = useState(false)

    useEffect(() => {
        const getReviewsById = async () => {
            try {
                setIsLoading(true)
                const response = await fetchReviewsByRestaurantId(restaurant.id)
                setReviews(response.reviews)
            } catch (err) {
                setHasErrors(true)
            } finally {
                setIsLoading(false)
            }
        }
        getReviewsById()
    }, [restaurant, hasErrors])

    return (
        <>
            {isLoading &&
                <div style={{ textAlign: 'center', }}>
                    <Spin size="large" />
                </div>}

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
                    message="There was an error while requesting reviews for this restaurant. Please retry."
                    style={{ marginBottom: '10px', }}
                >
                </Alert>}

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