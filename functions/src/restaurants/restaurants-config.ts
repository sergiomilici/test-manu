import { Application } from "express";
import {
  createRestaurant,
  deleteRestaurant,
  getRestaurants,
  getRestaurantWithId,
  updateRestaurant
} from "./controller";
import { isAuthenticated } from "../auth/authenticated";
import { isAuthorized } from "../auth/authorized";

export function restaurantsConfig(app: Application) {
  app.post(
    "/restaurants",
    isAuthenticated,
    isAuthorized({hasRole: ["owner"]}),
    createRestaurant
  );

  app.put(
    "/restaurants/:restaurantId",
    isAuthenticated,
    isAuthorized({hasRole: ["admin"]}),
    updateRestaurant
  );

  app.get(
    "/restaurants",
    isAuthenticated,
    isAuthorized({hasRole: ["admin", "owner", "user"]}),
    getRestaurants
  );

  app.get(
    "/restaurants/:restaurantId",
    isAuthenticated,
    isAuthorized({hasRole: ["admin", "owner", "user"]}),
    getRestaurantWithId
  );

  app.delete(
    "/restaurants/:restaurantId",
    isAuthenticated,
    isAuthorized({hasRole: ["admin"]}),
    deleteRestaurant
  );
}
