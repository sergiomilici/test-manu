import { Request, Response } from "express";
import { CreateRestaurantPayload } from "./create-restaurant-payload";
import {
  createRestaurantDoc,
  getAllRestaurants,
  getOwnerRestaurants,
  getRestaurantById,
  getRestaurantDoc,
  removeRestaurant,
  updateRestaurantData,
} from "./restaurants-store";
import { handleError } from "../utils";
import { Role } from "../auth/role";
import { Restaurant } from "./restaurant";

const validateRestaurantPayload = (restaurantPayload: CreateRestaurantPayload) => {
  const {name, country, city} = restaurantPayload;
  if (!name || name.length === 0 || name.length > 30) {
    throw new Error("Invalid arguments: name length must be between 0 and 30");
  }
  if (!country || country.length === 0 || country.length > 30) {
    throw new Error("Invalid arguments: country length must be between 0 and 30");
  }
  if (!city || city.length === 0 || city.length > 30) {
    throw new Error("Invalid arguments: city length must be between 0 and 30");
  }
};

export const createRestaurant = async (req: Request, res: Response): Promise<void> => {
  try {
    const createRestaurantPayload = req.body as CreateRestaurantPayload;
    validateRestaurantPayload(createRestaurantPayload);
    const {uid} = res.locals;
    const restaurantRef = await createRestaurantDoc(createRestaurantPayload, uid);
    console.log("Restaurant created with ID: ", restaurantRef.id);
    const restaurantDoc = await restaurantRef.get();
    res.send({ restaurant: {...restaurantDoc.data(), id: restaurantRef.id} });
  } catch (err) {
    handleError(res, err);
  }
};

export const updateRestaurant = async (req: Request, res: Response): Promise<void> => {
  try {
    const {restaurantId} = req.params;
    const updateRestaurantPayload = req.body as Partial<CreateRestaurantPayload>;

    const restaurantDoc = await getRestaurantDoc(restaurantId);
    const restaurantData = {
      ...(restaurantDoc.data() as Restaurant),
      ...updateRestaurantPayload,
    };

    validateRestaurantPayload(restaurantData);

    await updateRestaurantData(restaurantId, restaurantData);
    console.log("Restaurant updated with ID: ", restaurantId);
    res.sendStatus(200);
  } catch (err) {
    handleError(res, err);
  }
};

export const getRestaurants = async (req: Request, res: Response): Promise<void> => {
  try {
    const {role, uid} = res.locals;

    switch (role) {
      case "owner" as Role: {
        const restaurants = await getOwnerRestaurants(uid);
        res.send({restaurants});
        break;
      }
      case "user" as Role:
      case "admin" as Role:
      default: {
        const restaurants = await getAllRestaurants();
        res.send({restaurants: restaurants});
        break;
      }
    }
  } catch (err) {
    handleError(res, err);
  }
};

export const deleteRestaurant = async (req: Request, res: Response): Promise<void> => {
  try {
    const {restaurantId} = req.params;
    await removeRestaurant(restaurantId);
    res.sendStatus(200);
  } catch (err) {
    handleError(res, err);
  }
};

export const getRestaurantWithId = async (req: Request, res: Response): Promise<void> => {
  try {
    const {restaurantId} = req.params;
    res.send(await getRestaurantById(restaurantId));
  } catch (err) {
    handleError(res, err);
  }
}
