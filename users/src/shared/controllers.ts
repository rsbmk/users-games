import { NextFunction, Request, Response } from "express";
import { Schema, ZodError } from "zod";

type Options = {
  status?: number;
  message?: string;
  req?: Request;
};

export class Controller {
  success(data: unknown, res: Response, options?: Options) {
    const { message = "OK", req, status = 200 } = options || {};

    console.log({
      ...(req?.path ? { endpoint: req?.originalUrl } : {}),
      ...(req?.method ? { method: req?.method } : {}),
      mess: message,
    });

    return res.status(status).json({ data, message });
  }

  error(data: unknown, res: Response, options?: Options) {
    const { message = "Bad Request", req, status = 400 } = options || {};

    console.log({
      ...(req?.path ? { endpoint: req?.originalUrl } : {}),
      ...(req?.method ? { method: req?.method } : {}),
      mess: message,
    });

    return res.status(status).json({ data, message });
  }
}

const controller = new Controller();
export function validation(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req);
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
