import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { logger } from "../lib/logger";

interface HttpError extends Error {
  status?: number;
  statusCode?: number;
}

export const errorHandler: ErrorRequestHandler = (
  err: Error,
  req,
  res,
  _next,
) => {
  const isProduction = process.env.NODE_ENV === "production";
  const reqId = (req as any).id;

  // Handle Zod validation errors
  if (err instanceof ZodError) {
    logger.warn({ reqId, errors: err.issues }, "Validation error");
    res.status(400).json({
      error: "Validation Error",
      details: err.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      })),
    });
    return;
  }

  // Handle errors with explicit HTTP status codes
  const httpErr = err as HttpError;
  const statusCode = httpErr.status || httpErr.statusCode || 500;

  if (statusCode >= 500) {
    logger.error({ reqId, err }, "Unhandled server error");
  } else {
    logger.warn({ reqId, err: err.message }, "Client error");
  }

  res.status(statusCode).json({
    error:
      statusCode === 500 && isProduction
        ? "Internal Server Error"
        : err.message || "Internal Server Error",
    ...(isProduction ? {} : { stack: err.stack }),
  });
};
