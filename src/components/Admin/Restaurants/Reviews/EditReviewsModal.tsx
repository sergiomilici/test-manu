import { Modal } from 'antd';
import { useReviews } from './useReviews';
import { Review } from '../../../../../functions/src/reviews/review';
import { ReviewComment } from './Review';
import { Loader } from '../../../Loader';

interface EditReviewsModalProps {
  isModalOpen: boolean;
  onClose: () => void;
  restaurantId: string;
}

export const EditReviewsModal = ({isModalOpen, onClose, restaurantId}: EditReviewsModalProps) => {
  const {data: reviews, isLoading} = useReviews<Review>(restaurantId);

  return (
    <Modal title="Edit Reviews & Replies"
           visible={isModalOpen}
           onCancel={onClose}
           footer={null}
    >
      {isLoading && <Loader />}
      {!isLoading && (
        reviews.map(review => (
          <ReviewComment
            review={review}
            restaurantId={restaurantId}
            key={review.id} />
        ))
      )}
      {!isLoading && reviews.length === 0 && (
        <span>There are no reviews on this restaurant</span>
      )}
    </Modal>
  );
}
