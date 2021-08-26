import { Application } from "express";
import { create, all, get, patch, remove } from "./controller";
import { isAuthenticated } from "../auth/authenticated";
import { isAuthorized } from "../auth/authorized";

export function routesConfig(app: Application) {
  // app.post("/users", isAuthenticated, isAuthorized({ hasRole: ["admin", "owner"] }), create);
  app.post("/users", create);

  app.get("/users", [
    isAuthenticated,
    isAuthorized({hasRole: ["admin", "owner"]}),
    all,
  ]);
  
  app.get("/users/:id", [
    isAuthenticated,
    isAuthorized({hasRole: ["admin", "owner"], allowSameUser: true}),
    get,
  ]);
  
  app.patch("/users/:id", [
    isAuthenticated,
    isAuthorized({hasRole: ["admin", "owner"], allowSameUser: true}),
    patch,
  ]);
  
  app.delete("/users/:id", [
    isAuthenticated,
    isAuthorized({hasRole: ["admin", "owner"]}),
    remove,
  ]);
}
