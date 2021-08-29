import { Review } from '../../../../../../functions/src/reviews/review';
import styled from 'styled-components';
import { Divider, Wrapper } from '../Review';
import { Actions } from '../Actions';
import { formatDate } from '../formatDate';
import { useState } from 'react';
import { EditComment } from '../../../Shared/EditComment';
import { deleteReply, patchReply } from '../../../../../Api';

interface ReplyProps {
  review: Review;
  restaurantId: string;
}

const ReplyWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
`
const CurveLine = styled.div`
  border-radius: 8px;
  border-left: 1px solid #121015;
  border-bottom: 1px solid #121015;
  border-right: none;
  border-top: none;
  width: 20px;
  border-top-left-radius: 0;
  border-bottom-right-radius: 0;
  height: 23px;
  margin-left: 5px;
  margin-right: 5px;
`

const Header = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 10px;
`

export const Reply = ({review, restaurantId}: ReplyProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [replyComment, setReplyComment] = useState<string>(review.reply)

  if (!replyComment) {
    return null;
  }

  return (
    <ReplyWrapper>
      <CurveLine />
      <Wrapper>
        <Header>
          <span>{formatDate(review.reply_date)}</span>
          <Divider />
          <Actions
            deleteType='reply'
            onRemove={async () => {
              await deleteReply(restaurantId, review.id!);
              setReplyComment('')
            }}
            onEdit={() => setIsEditing(true)}
          />
        </Header>
        {!isEditing ? replyComment :
          <EditComment
            comment={replyComment}
            onCancel={() => setIsEditing(false)}
            saveFn={async (comment: string) => {
              await patchReply(restaurantId, review.id!, comment)
              setReplyComment(comment);
              setIsEditing(false);
            }}
          />}
      </Wrapper>
    </ReplyWrapper>
  )
}
