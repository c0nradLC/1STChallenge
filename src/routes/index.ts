import { Router } from "express";
import { usersRoutes } from "./users.routes";

const router = Router();

router.get("/", (request, response) =>
  response.json({ message: "Server running!" })
);

router.use("/users", usersRoutes);

export { router };