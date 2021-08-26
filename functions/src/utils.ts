import { Response } from "express";

export const TEST_UID = "gSuhuRSMUZE6kkD0evZf";

export function handleError(res: Response, err: any) {
  console.error(err);
  return res.status(500).send({ message: `${err.code || 500} - ${err.message}` });
}
