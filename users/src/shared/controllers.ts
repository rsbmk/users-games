import type { Request, Response } from "express";

import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { CustomsExceptions } from "./customs.exeptions";

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

    console.error({
      ...(req?.path ? { endpoint: req?.originalUrl } : {}),
      ...(req?.method ? { method: req?.method } : {}),
      mess: message,
    });

    return res.status(status).json({ data, message });
  }

  catchError(error: unknown, res: Response, options?: Options) {
    // console.log({ error });
    if (error instanceof PrismaClientKnownRequestError) {
      const prismaMessage = error.meta?.cause as string;
      return this.error(
        {
          code: error.code,
        },
        res,
        { message: prismaMessage || "Known error", status: 500, ...options }
      );
    }

    if (error instanceof CustomsExceptions) {
      return this.error(error.data, res, { message: error.message, status: error.status_exception, ...options });
    }

    // if (error instanceof Error) {
    //   return this.error({}, res, { message: error.message, status: 500, ...options });
    // }

    return this.error({}, res, { message: "Internal server error", status: 500, ...options });
  }
}
