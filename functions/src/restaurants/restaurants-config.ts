import { Application } from "express";
import { createRestaurant, deleteRestaurant, getRestaurants, updateRestaurant } from "./controller";

export function restaurantsConfig(app: Application) {
  app.post(
    "/restaurants",
    // isAuthenticated,
    // isAuthorized({hasRole: ["admin", "owner"]}),
    createRestaurant
  );

  app.put(
    "/restaurants/:restaurantId",
    // isAuthenticated,
    // isAuthorized({hasRole: ["admin", "owner"]}),
    updateRestaurant
  );

  app.get(
    "/restaurants",
    // isAuthenticated,
    // isAuthorized({hasRole: ["admin", "owner"]}),
    getRestaurants
  );

  app.delete(
    "/restaurants/:restaurantId",
    // isAuthenticated,
    // isAuthorized({hasRole: ["admin", "owner"]}),
    deleteRestaurant
  );
}
