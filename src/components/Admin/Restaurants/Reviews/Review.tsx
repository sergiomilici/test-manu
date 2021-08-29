import { Review } from '../../../../../functions/src/reviews/review';
import styled from 'styled-components';
import { useFetchUser } from '../../useFetchUser';
import { User } from '../../Users/User';
import { Rate, Skeleton } from 'antd';
import { Actions } from './Actions';
import { formatDate } from './formatDate';
import { useState } from 'react';
import { EditComment } from '../../Shared/EditComment';
import { Reply } from './Reply/Reply';
import { patchReview, deleteReview } from '../../../../Api';

interface ReviewProps {
  restaurantId: string;
  review: Review;
}

export const Wrapper = styled.div`
  background-color: rgb(178 183 187);
  color: #0b0c0e;
  border-radius: 6px;
  margin-bottom: 5px;
  padding: 3px 5px;
  width: 100%;
`

const Header = styled.div`
  font-size: 10px;
  display: flex;
  justify-content: space-between;
`

const HeaderLeft = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

export const Divider = styled.div`
  width: 1px;
  height: 10px;
  margin: 0 5px;
  display: inline-block;
  background-color: rgb(11, 12, 14);
`

export const ReviewComment = ({review, restaurantId}: ReviewProps) => {
  const {
    isLoading: isLoadingUser,
    data
  } = useFetchUser<User>(review.uid || 'Vk2Eq6mm8pfPOJQAaq4v6EMXy2V2')
  const user = data[0];
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [reviewComment, setReviewComment] = useState<string>(review.comment)

  if (!reviewComment) {
    return null;
  }

  if (isLoadingUser) {
    return (
      <Wrapper>
        <Skeleton loading={true} active avatar={false} paragraph={false} />
      </Wrapper>
    )
  }

  return (
    <>
      <Wrapper>
        <Header>
          <HeaderLeft>
            <span>{user?.displayName}
              <Divider />
              {formatDate(review.date_of_comment)}</span>
            <Divider />
            <Rate value={review.stars} disabled={true} style={{fontSize: '10px'}} />
            <Divider />
            <Actions
              deleteType="review"
              onRemove={async () => {
                await deleteReview(restaurantId, review.id!);
                setReviewComment('')
              }}
              onEdit={() => setIsEditing(true)}
            />
          </HeaderLeft>

        </Header>
        {!isEditing ? reviewComment :
          <EditComment
            comment={reviewComment}
            onCancel={() => setIsEditing(false)}
            saveFn={async (comment: string) => {
              await patchReview(restaurantId, review.id!, comment);
              setReviewComment(comment);
              setIsEditing(false);
            }}
          />}
      </Wrapper>
      <Reply review={review} restaurantId={restaurantId} />
    </>
  )
}
