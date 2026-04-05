import { Router } from "express";
import { Register , Login , Signout} from "../controllers/auth.controller.js";
import arcjetMiddleware from "../middlewares/arcjet.midlleware.js";
const authRouter = Router();
authRouter.use(arcjetMiddleware)
authRouter.post("/login", Login);
authRouter.post("/register", Register);
authRouter.post("/signout", Signout);
export default authRouter;