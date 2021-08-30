import { useState } from 'react'
import { fetchPendingReplyReview } from '../../Api';
import { Button, notification } from 'antd';
import ReplyForm from '../ReplyForm/ReplyForm';
import styled from 'styled-components';
import { CheckCircleOutlined } from "@ant-design/icons";
import { Review } from "../../../functions/src/reviews/review"

const Wrapper = styled.div`
    overflow-y:auto;
`
const ReviewReplier = ({ restaurantId }) => {

    const [pendingRepliesReviews, setPendingRepliesReviews] = useState<Review[]>()
    const [isLoading, setIsLoading] = useState(false)

    const getReviewsPendingReply = async (restaurantId) => {
        try {
            setIsLoading(true)
            const response = await fetchPendingReplyReview(restaurantId)
            setPendingRepliesReviews(response.reviews)
        } catch (err) {
            notification.error({
                message: 'Error',
                description:
                    err.message
            });
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Wrapper>
            <Button
                style={{ marginBottom: '8px', }}
                type="primary"
                disabled={isLoading}
                onClick={() => getReviewsPendingReply(restaurantId)}
            >{!isLoading ? 'See reviews pending reply' : 'Loading'}</Button>

            {pendingRepliesReviews?.length === 0 && <p><CheckCircleOutlined /> No pending replies</p>}

            {pendingRepliesReviews?.map((review) => (
                <ReplyForm
                    onReplyAdded={(restaurantId) => getReviewsPendingReply(restaurantId)}
                    restaurantId={restaurantId}
                    comment={review.comment}
                    reviewId={review.id}
                    key={review.id} />
            ))}
        </Wrapper>)
}

export default ReviewReplier