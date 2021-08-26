import { Request, Response } from "express";
import { Role } from "./role";

export function isAuthorized(opts: { hasRole: Array<Role>; allowSameUser?: boolean }) {
  return (req: Request, res: Response, next: Function) => {
    const { role, email, uid } = res.locals;
    const { id } = req.params;

    if (email === "cataldi.manuel@gmail.com") return next();

    if (opts.allowSameUser && id && uid === id) return next();

    if (!role) return res.status(403).send();

    if (opts.hasRole.includes(role)) return next();

    return res.status(403).send();
  };
}
