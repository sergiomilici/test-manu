import { useState } from 'react'
import { fetchPendingReplyReview } from '../../Api';
import { Button, notification } from 'antd';
import ReplyForm from '../ReplyForm/ReplyForm';
import styled from 'styled-components';

const Wrapper = styled.div`
    overflow-y:auto;
`

interface Review {
    id?: string;
    stars: number;
    date_of_visit: number;
    date_of_comment: number;
    comment: string;
    reply: string;
}

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

            {pendingRepliesReviews?.length === 0 && <p>No pending replies</p>}

            {pendingRepliesReviews?.map((review) => (
                <ReplyForm restaurantId={restaurantId} comment={review.comment} key={review.id} />
            ))}
        </Wrapper>)
}

export default ReviewReplier