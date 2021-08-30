import { Request, Response } from "express";
import { CreateReviewPayload } from "./create-review-payload";
import {
  getRestaurantDoc,
  getRestaurantRef,
  updateRatedReviews,
  updateRestaurantRating,
} from "../restaurants/restaurants-store";
import { Review } from "./review";
import { Collections } from "../collections";
import { ReplyReviewPayload } from "./reply-review-payload";
import {
  addReplyToReview,
  deleteReply,
  deleteReview,
  getReviewsForRestaurant,
  getReviewsPendingToReply,
  updateReviewData,
} from "./reviews-store";
import { handleError } from "../utils";
import { getUnixTimestamp } from "../date-utils";

const MAX_COMMENT_LENGTH = 250;

export const validateReviewPayload = (reviewPayload: CreateReviewPayload) => {
  if (!reviewPayload) {
    throw new Error("Invalid review payload");
  }
  const {comment, date_of_visit, stars} = reviewPayload;

  if (comment.length === 0 || comment.length > MAX_COMMENT_LENGTH) {
    throw new Error(
      `Invalid review payload: Comment can not be empty and must be less than ${MAX_COMMENT_LENGTH} chars`
    );
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const intStars = parseInt(stars, 10);
  if (isNaN(intStars) || intStars < 1 || intStars > 5) {
    throw new Error("Invalid review payload: Stars must be between 1 and 5");
  }

  if (!Number.isInteger(date_of_visit)) {
    throw new Error("Invalid review payload: date_of_visit is invalid");
  }
};

export const createReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const {restaurantId} = req.params;
    const reviewPayload = req.body as CreateReviewPayload;
    validateReviewPayload(reviewPayload);

    const restaurantDoc = await getRestaurantDoc(restaurantId);
    if (!restaurantDoc.exists) {
      throw new Error(`Restaurant "${restaurantId}" doesn't exist`);
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const stars = parseInt(reviewPayload.stars, 10);

    const reviewRef = await getRestaurantRef(restaurantId)
      .collection(Collections.Reviews)
      .add({
        ...reviewPayload,
        stars,
        date_of_comment: getUnixTimestamp(),
        date_of_visit: reviewPayload.date_of_visit,
        reply: "",
      });

    const review = (await reviewRef.get()).data() as Review;
    const reviewId = reviewRef.id;

    await updateRestaurantRating(restaurantId, stars);
    await updateRatedReviews(restaurantId, reviewId, review);

    console.log("Review created with ID: ", reviewId);

    res.send({ok: true});
  } catch (err) {
    handleError(res, err);
  }
};

export const replyToReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const {restaurantId, reviewId} = req.params;
    const {uid} = res.locals;
    const replyReviewPayload = req.body as ReplyReviewPayload;

    const replyComment = replyReviewPayload?.reply || "";
    if (replyComment.length === 0 || replyComment.length > MAX_COMMENT_LENGTH) {
      throw new Error(`Invalid arguments: Reply comment must exists and not exceed ${MAX_COMMENT_LENGTH} chars`);
    }

    // Add the reply to the review
    await addReplyToReview(restaurantId, reviewId, replyComment, uid);

    res.send({ok: true});
  } catch (err) {
    handleError(res, err);
  }
};

export const patchReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const {restaurantId, reviewId} = req.params;
    const {uid} = res.locals;
    const replyReviewPayload = req.body as ReplyReviewPayload;

    const replyComment = replyReviewPayload?.reply || "";
    if (replyComment.length === 0 || replyComment.length > MAX_COMMENT_LENGTH) {
      throw new Error(`Invalid arguments: Reply comment must exists and not exceed ${MAX_COMMENT_LENGTH} chars`);
    }

    // Add the reply to the review
    await addReplyToReview(restaurantId, reviewId, replyComment, uid, true);

    res.send({ok: true});
  } catch (err) {
    handleError(res, err);
  }
};

export const removeReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const {restaurantId, reviewId} = req.params;
    await deleteReview(restaurantId, reviewId);
    res.sendStatus(200);
  } catch (err) {
    handleError(res, err);
  }
};

export const removeReply = async (req: Request, res: Response): Promise<void> => {
  try {
    const {restaurantId, reviewId} = req.params;
    await deleteReply(restaurantId, reviewId);
    res.sendStatus(200);
  } catch (err) {
    handleError(res, err);
  }
};

export const updateReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const {restaurantId, reviewId} = req.params;
    const reviewPayload = req.body as Partial<CreateReviewPayload>;

    await updateReviewData(restaurantId, reviewId, reviewPayload);
    res.sendStatus(200);
  } catch (err) {
    handleError(res, err);
  }
};

export const getPendingReplyReviews = async (req: Request, res: Response): Promise<void> => {
  try {
    const {restaurantId} = req.params;
    const reviewsPendingToReply = await getReviewsPendingToReply(restaurantId);
    res.send({
      reviews: reviewsPendingToReply,
    });
  } catch (err) {
    handleError(res, err);
  }
};

export const getReviews = async (req: Request, res: Response): Promise<void> => {
  try {
    const {restaurantId} = req.params;
    const reviews = await getReviewsForRestaurant(restaurantId);
    res.send({
      reviews,
    });
  } catch (err) {
    handleError(res, err);
  }
};
