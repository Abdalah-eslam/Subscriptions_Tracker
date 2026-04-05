import { Router } from "express";
import { getAllUsers ,getUser ,UpdateUser ,DeleteUser} from "../controllers/user.controller.js";
import {authorize} from "../middlewares/authMidlleware.js";
const userRouter = Router();
userRouter.get("/",getAllUsers ),
userRouter.get("/:id",getUser );
userRouter.put("/", authorize, UpdateUser);
userRouter.delete("/", authorize, DeleteUser);
export default userRouter;