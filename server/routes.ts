import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/tasbih/:userId", async (req, res) => {
    const count = await storage.getTasbihCount(req.params.userId);
    res.json({ count });
  });

  app.post("/api/tasbih/:userId", async (req, res) => {
    const { count } = req.body;
    if (typeof count !== "number" || count < 0) {
      return res.status(400).json({ error: "Noto'g'ri son" });
    }
    const saved = await storage.setTasbihCount(req.params.userId, count);
    res.json({ count: saved });
  });

  const httpServer = createServer(app);
  return httpServer;
}
