import { getFirestoreDB } from "../firebase-admin";
import { firestore } from "firebase-admin";
import { Restaurant } from "./restaurant";
import { Review } from "../reviews/review";
import { Collections } from "../collections";
import { CreateRestaurantPayload } from "./create-restaurant-payload";
import { removeAllReviews } from "../reviews/reviews-store";
import DocumentReference = firestore.DocumentReference;
import DocumentData = firestore.DocumentData;

export const getRestaurantRef = (restaurantId: string): DocumentReference<DocumentData> => {
  const db = getFirestoreDB();
  return db.collection(Collections.Restaurants).doc(restaurantId);
};

export const getRestaurantDoc = async (restaurantId: string) => {
  return getRestaurantRef(restaurantId).get();
};

export const createRestaurantDoc = async (
  restaurantPayload: CreateRestaurantPayload,
  uid: string
): Promise<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>> => {
  const db = getFirestoreDB();
  return db.collection(Collections.Restaurants).add({
    ...restaurantPayload,
    avg_rating: 0,
    uid,
  });
};

export const updateRestaurantData = async (
  restaurantId: string,
  restaurantPayload: CreateRestaurantPayload
): Promise<FirebaseFirestore.WriteResult> => {
  const db = getFirestoreDB();
  return db.collection(Collections.Restaurants).doc(restaurantId).set(restaurantPayload, { merge: true });
};

export const updateRestaurantRating = async (restaurantId: string, rate: number) => {
  const restaurantRef = getRestaurantRef(restaurantId);
  const restaurantDoc = await restaurantRef.get();
  const restaurant = restaurantDoc.data() as Restaurant;
  let updatedAvgRating: number = rate;
  // 0 means no reviews yet
  if (restaurant.avg_rating !== 0) {
    updatedAvgRating = parseFloat(((restaurant.avg_rating + rate) / 2).toFixed(2));
  }
  await restaurantRef.update({ avg_rating: updatedAvgRating });
};

export const updateRatedReviews = async (restaurantId: string, reviewId: string, review: Review): Promise<void> => {
  const restaurantRef = getRestaurantRef(restaurantId);
  const restaurantDoc = await restaurantRef.get();
  const restaurant = restaurantDoc.data() as Restaurant;
  const reviewData = {
    ...review,
    id: reviewId,
  };
  const isHighestRatedReview = restaurant.highest_rated_review?.id === reviewId;
  const isLowestRatedReview = restaurant.lowest_rated_review?.id === reviewId;
  if (
    !restaurant.highest_rated_review ||
    review.stars >= restaurant.highest_rated_review.stars ||
    isHighestRatedReview
  ) {
    await restaurantRef.update({ highest_rated_review: reviewData });
  } else if (
    !restaurant.lowest_rated_review ||
    review.stars <= restaurant.lowest_rated_review.stars ||
    isLowestRatedReview
  ) {
    await restaurantRef.update({ lowest_rated_review: reviewData });
  }
};

export const addReplyToRatedReview = async (restaurantId: string, reviewId: string, reply: string) => {
  const restaurantRef = getRestaurantRef(restaurantId);
  const restaurantDoc = await restaurantRef.get();
  const restaurant = restaurantDoc.data() as Restaurant;

  if (restaurant.highest_rated_review && restaurant.highest_rated_review.id === reviewId) {
    await restaurantRef.update({
      highest_rated_review: {
        ...restaurant.highest_rated_review,
        reply,
      },
    });
  } else if (restaurant.lowest_rated_review && restaurant.lowest_rated_review.id === reviewId) {
    await restaurantRef.update({
      lowest_rated_review: {
        ...restaurant.lowest_rated_review,
        reply,
      },
    });
  }
};

const mapToRestaurants = (
  restaurantSnapshots: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>
): Restaurant[] => {
  const restaurants: Restaurant[] = [];
  restaurantSnapshots.forEach(doc => {
    restaurants.push({
      ...(doc.data() as Restaurant),
      id: doc.id,
    });
  });
  return restaurants;
};

export const getOwnerRestaurants = async (uid: string): Promise<Restaurant[]> => {
  const db = getFirestoreDB();
  const snapshots = await db.collection(Collections.Restaurants).where("uid", "==", uid).get();
  return mapToRestaurants(snapshots);
};

export const getAllRestaurants = async (): Promise<Restaurant[]> => {
  const db = getFirestoreDB();
  const snapshots = await db.collection(Collections.Restaurants).orderBy("avg_rating", "desc").get();
  return mapToRestaurants(snapshots);
};

export const removeRestaurant = async (restaurantId: string) => {
  await removeAllReviews(restaurantId);
  const restaurantRef = getRestaurantRef(restaurantId);
  await restaurantRef.delete();
};

export const getRestaurantById = async (restaurantId: string): Promise<Restaurant> => {
  const restaurantDoc = await getRestaurantDoc(restaurantId);
  return {
    ...(restaurantDoc.data() as Restaurant),
    id: restaurantId,
  };
}
