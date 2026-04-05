import { Router } from "express";
import { getAllUsers ,getUser ,UpdateUser ,DeleteUser} from "../controllers/user.controller.js";
import {authorize} from "../middlewares/authMidlleware.js";
import arcjetMiddleware from "../middlewares/arcjet.midlleware.js";
const userRouter = Router();
userRouter.use(arcjetMiddleware)
userRouter.get("/",getAllUsers ),
userRouter.get("/:id",getUser );
userRouter.put("/", authorize, UpdateUser);
userRouter.delete("/", authorize, DeleteUser);
export default userRouter;