import express, { NextFunction, Request, Response } from "express";
import { dataService } from "../5-services/data-service";

// Data controller:
class DataController {
  // Create a router object for listening to HTTP requests:
  public readonly router = express.Router();

  // Register routes once:
  public constructor() {
    this.registerRoutes();
  }

  // Register routes:
  private registerRoutes(): void {
    this.router.get("/words", this.getAllWords);
  }

  // GET http://localhost:4000/api/words
  private async getAllWords(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const words = await dataService.getAllWords();
      response.json(words);
    } catch (err: any) {
      next(err);
    }
  }
}

const dataController = new DataController();
export const dataRouter = dataController.router;
