import {
  addReplyToRatedReview,
  getRestaurantDoc,
  getRestaurantRef,
  updateRatedReviews,
} from "../restaurants/restaurants-store";
import { Collections } from "../collections";
import { Review } from "./review";
import { getUnixTimestamp } from "../date-utils";
import { Restaurant } from "../restaurants/restaurant";
import { CreateReviewPayload } from "./create-review-payload";
import { validateReviewPayload } from "./controller";

export const getReviewRef = async (restaurantId: string, reviewId: string) => {
  const restaurantDoc = await getRestaurantDoc(restaurantId);

  if (!restaurantDoc.exists) {
    throw new Error(`Restaurant "${restaurantId}" doesn't exist`);
  }

  const reviewRef = await getRestaurantRef(restaurantId).collection(Collections.Reviews).doc(reviewId);

  const reviewDoc = await reviewRef.get();

  if (!reviewDoc.exists) {
    throw new Error(`Restaurant "${restaurantId}" with review "${reviewId}" not found`);
  }

  return reviewRef;
};

export const addReplyToReview = async (restaurantId: string, reviewId: string, reply: string): Promise<void> => {
  const reviewRef = await getReviewRef(restaurantId, reviewId);
  const reviewDoc = await reviewRef.get();
  const review = reviewDoc.data() as Review;

  if (review.reply) {
    throw new Error(`Restaurant "${restaurantId}" with review "${reviewId}" already has a reply.`);
  }

  await reviewRef.update({
    reply,
    reply_date: getUnixTimestamp(),
  });

  // Update the review if it is highest or lowest rated
  await addReplyToRatedReview(restaurantId, reviewId, reply);
};

export const deleteReview = async (restaurantId: string, reviewId: string): Promise<void> => {
  const reviewRef = await getReviewRef(restaurantId, reviewId);
  const restaurantDoc = await getRestaurantDoc(restaurantId);
  const restaurantRef = getRestaurantRef(restaurantId);
  const restaurant = restaurantDoc.data() as Restaurant;

  // Delete the review
  await reviewRef.delete();

  if (restaurant.highest_rated_review?.id === reviewId) {
    const review = await getRatedReview(restaurantId, "desc");
    console.log("get new highest_rated_review: ", review);
    await restaurantRef.update({
      highest_rated_review: review,
    });
  } else if (restaurant.lowest_rated_review?.id === reviewId) {
    const review = await getRatedReview(restaurantId, "asc");
    console.log("get new lowest_rated_review: ", review);
    await restaurantRef.update({
      lowest_rated_review: review,
    });
  }
};

export const getRatedReview = async (restaurantId: string, order: "asc" | "desc"): Promise<Review | null> => {
  const restaurantRef = getRestaurantRef(restaurantId);
  const reviewsRef = restaurantRef
    .collection(Collections.Reviews)
    .orderBy("stars", order)
    .orderBy("date_of_comment", "desc")
    .limit(1);

  const querySnapshot = await reviewsRef.get();

  let review: Review | null = null;
  querySnapshot.forEach(reviewDoc => {
    if (reviewDoc.exists && !review) {
      review = {
        ...(reviewDoc.data() as Review),
        id: reviewDoc.id,
      };
    }
  });

  return review;
};

export const deleteReply = async (restaurantId: string, reviewId: string): Promise<void> => {
  const reviewRef = await getReviewRef(restaurantId, reviewId);
  const restaurantDoc = await getRestaurantDoc(restaurantId);
  const restaurantRef = getRestaurantRef(restaurantId);
  const restaurant = restaurantDoc.data() as Restaurant;

  await reviewRef.update({
    reply: "",
  });

  if (restaurant.highest_rated_review?.id === reviewId) {
    await restaurantRef.update({
      "highest_rated_review.reply": "",
    });
  } else if (restaurant.lowest_rated_review?.id === reviewId) {
    await restaurantRef.update({
      "lowest_rated_review.reply": "",
    });
  }
};

export const removeAllReviews = async (restaurantId: string) => {
  const restaurantRef = getRestaurantRef(restaurantId);
  const reviewsRef = restaurantRef.collection(Collections.Reviews);

  const reviewsSnapshot = await reviewsRef.get();
  const deletePromises = reviewsSnapshot.docs.map(doc => doc.ref.delete());
  return Promise.all(deletePromises);
};

export const updateReviewData = async (
  restaurantId: string,
  reviewId: string,
  reviewPayload: Partial<CreateReviewPayload>
) => {
  const reviewRef = await getReviewRef(restaurantId, reviewId);
  const reviewDoc = await reviewRef.get();
  const currentReview = reviewDoc.data() as Review;

  let stars = currentReview.stars;
  if (reviewPayload.stars) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    stars = parseInt(reviewPayload.stars, 10);
  }

  const reviewData = {
    ...currentReview,
    ...reviewPayload,
    stars,
  };
  validateReviewPayload(reviewData);
  await reviewRef.set(reviewData, {merge: true});
  await updateRatedReviews(restaurantId, reviewId, reviewData);
};

const mapSnapshotToReview = (reviewSnapshots: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>) => {
  const reviews: Review[] = [];
  reviewSnapshots.forEach(reviewDoc => {
    if (reviewDoc.exists) {
      reviews.push({
        ...(reviewDoc.data() as Review),
      });
    }
  });
  return reviews;
};

export const getReviewsPendingToReply = async (restaurantId: string) => {
  const restaurantRef = getRestaurantRef(restaurantId);
  const reviewsRef = restaurantRef
    .collection(Collections.Reviews)
    .where("reply", "==", "")
    .orderBy("date_of_comment", "asc");

  const reviewSnapshots = await reviewsRef.get();
  return mapSnapshotToReview(reviewSnapshots);
};

export const getReviewsForRestaurant = async (restaurantId: string) => {
  const restaurantRef = getRestaurantRef(restaurantId);
  const reviewsRef = restaurantRef.collection(Collections.Reviews).orderBy("date_of_comment", "desc");

  const reviewSnapshots = await reviewsRef.get();
  return mapSnapshotToReview(reviewSnapshots);
};
