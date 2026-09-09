import { db } from "@workspace/db";
import { sql } from "drizzle-orm";
import { logger } from "../lib/logger";

export interface HealthStatusResult {
  status: string;
  database?: "connected" | "disconnected" | "not_configured";
}

export class HealthService {
  /**
   * Executes a lightweight ping query via Drizzle ORM to verify database connectivity.
   */
  async checkDatabase(): Promise<boolean> {
    if (!process.env.DATABASE_URL) {
      return false;
    }
    try {
      await db.execute(sql`SELECT 1`);
      return true;
    } catch (error) {
      logger.warn({ error }, "Database health check ping failed");
      return false;
    }
  }

  /**
   * Evaluates system and database health status.
   */
  async getHealth(): Promise<HealthStatusResult> {
    const hasDbUrl = Boolean(process.env.DATABASE_URL);
    let dbStatus: HealthStatusResult["database"] = "not_configured";

    if (hasDbUrl) {
      const isDbHealthy = await this.checkDatabase();
      dbStatus = isDbHealthy ? "connected" : "disconnected";
    }

    return {
      status: "ok",
      database: dbStatus,
    };
  }
}

export const healthService = new HealthService();
