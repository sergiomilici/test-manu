import { Application } from "express";
import {
  createReview,
  getPendingReplyReviews,
  getReviews,
  patchReview,
  removeReply,
  removeReview,
  replyToReview,
  updateReview,
} from "./controller";
import { isAuthenticated } from '../auth/authenticated';
import { isAuthorized } from '../auth/authorized';

export function reviewsConfig(app: Application) {
  app.post(
    "/reviews/:restaurantId",
    isAuthenticated,
    isAuthorized({hasRole: ["admin", "owner", "user"]}),
    createReview
  );
  app.patch(
    "/reviews/:restaurantId/:reviewId",
    isAuthenticated,
    isAuthorized({hasRole: ["admin", "owner"]}),
    updateReview
  );
  // Add reply
  app.put(
    "/reviews/:restaurantId/:reviewId/reply",
    isAuthenticated,
    isAuthorized({hasRole: ["admin", "owner"]}),
    replyToReview
  );
  app.patch(
    "/reviews/:restaurantId/:reviewId/reply",
    isAuthenticated,
    isAuthorized({hasRole: ["admin", "owner"]}),
    patchReview
  );
  app.delete(
    "/reviews/:restaurantId/:reviewId",
    isAuthenticated,
    isAuthorized({hasRole: ["admin", "owner"]}),
    removeReview
  );
  app.delete(
    "/reviews/:restaurantId/:reviewId/reply",
    isAuthenticated,
    isAuthorized({hasRole: ["admin", "owner"]}),
    removeReply
  );
  app.get(
    "/reviews/:restaurantId/pending",
    isAuthenticated,
    isAuthorized({hasRole: ["owner"]}),
    getPendingReplyReviews
  );
  app.get(
    "/reviews/:restaurantId",
    isAuthenticated,
    isAuthorized({hasRole: ["admin","owner", "user"]}),
    getReviews
  );
}
