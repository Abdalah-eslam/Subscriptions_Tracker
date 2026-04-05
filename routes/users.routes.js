import { Router } from "express";
const userRouter = Router();
userRouter.get("/", (req, res) => {res.send("GET all users");});
userRouter.get("/:id", (req, res) => {res.send("GET user by ID");});
userRouter.post("/", (req, res) => {res.send("CREATE user");});
userRouter.put("/:id", (req, res) => {res.send("UPDATE user by ID");});
userRouter.delete("/:id", (req, res) => {res.send("DELETE user by ID");});
export default userRouter;