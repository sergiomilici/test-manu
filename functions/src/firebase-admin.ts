import * as admin from "firebase-admin";
import { app } from "firebase-admin/lib/firebase-namespace-api";

let firebaseApp: app.App;

export const initializeFirebaseApp = (): void => {
  if (firebaseApp) {
    return;
  }
  firebaseApp = admin.initializeApp();
};

export const getFirestoreDB = () => {
  initializeFirebaseApp();
  return admin.firestore();
};
