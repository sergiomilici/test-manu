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
        console.log(restaurantId)
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

    console.log(reviews)
    //Reviews are sorted desc
    return (
        <>
            {isLoading && <Spin style={{ margin: 'auto' }} size="large" />}

            {(reviews || []).map((review) => (
                <ReviewCard review={review} key={review.id} />
            ))}

            {/* {!isLoading && mockReviews.map((review, index) => (
               
            ))} */}

            {/* {mockReviews &&
                <>
                    <h2>Reviews for this place</h2>
                    {mockReviews.map((review, index) => (
                        <ReviewCard review={review} key={index} />
                    ))}
                </>
            } */}

        </>
    )
}

export default ReviewsList