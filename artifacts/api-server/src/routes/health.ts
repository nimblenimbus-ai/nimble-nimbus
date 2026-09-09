import { Router, type IRouter } from "express";
import { HealthCheckResponse } from "@workspace/api-zod";
import { healthService } from "../services";

const router: IRouter = Router();

router.get("/healthz", async (_req, res, next) => {
  try {
    const health = await healthService.getHealth();
    const data = HealthCheckResponse.parse({ status: health.status });
    res.json(data);
  } catch (error) {
    next(error);
  }
});

export default router;
