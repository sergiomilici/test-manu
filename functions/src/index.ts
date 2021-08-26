import * as functions from "firebase-functions";
import * as express from "express";
import * as cors from "cors";
import { routesConfig } from "./users/routes-config";
import { restaurantsConfig } from "./restaurants/restaurants-config";
import { initializeFirebaseApp } from "./firebase-admin";
import { reviewsConfig } from "./reviews/reviews-config";

console.log("*****************************************")
initializeFirebaseApp();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: true }));
routesConfig(app);
restaurantsConfig(app);
reviewsConfig(app);

export const api = functions.https.onRequest(app);
