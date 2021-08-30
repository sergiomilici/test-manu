import { Application } from "express";
import {
  createReview,
  getPendingReplyReviews,
  getReviews,
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
    isAuthorized({hasRole: ["admin", "owner"]}),
    createReview
  );
  app.put(
    "/reviews/:restaurantId/:reviewId",
    isAuthenticated,
    isAuthorized({hasRole: ["admin", "owner"]}),
    updateReview
  );
  // Add/Edit reply
  app.put(
    "/reviews/:restaurantId/:reviewId/reply",
    isAuthenticated,
    isAuthorized({hasRole: ["admin", "owner"]}),
    replyToReview
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
    isAuthorized({hasRole: ["owner"]}),
    getReviews
  );
}
