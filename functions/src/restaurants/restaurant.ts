import { Review } from "../reviews/review";

export interface Restaurant {
  id?: string;
  uid: string; // user id
  name: string;
  city: string;
  country: string;
  avg_rating: number;
  highest_rated_review: Review;
  lowest_rated_review: Review;
}
