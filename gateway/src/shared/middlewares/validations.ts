import { NextFunction, Request, Response } from "express";
import { Schema, ZodError } from "zod";

import { Controller } from "../controllers";

const controller = new Controller();

export function validation(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors = error.flatten().fieldErrors;

        return controller.error(fieldErrors, res, {
          message: "Validation error",
          req,
        });
      }

      return controller.error({}, res, {
        message: "Validation error",
        req,
      });
    }
  };
}
