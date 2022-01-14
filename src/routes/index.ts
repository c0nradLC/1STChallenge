import { Router } from "express";

import { usersRoutes } from "./users.routes";
import { authenticateRoutes } from "./authenticate.routes";

const router = Router();

router.get("/", (request, response) =>
  response.json({ message: "Server running!" })
);

router.use("/users", usersRoutes);
router.use("/authenticate", authenticateRoutes);

export { router };