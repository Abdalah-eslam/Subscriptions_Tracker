import { Router } from "express";
import { Register , Login , Signout} from "../controllers/auth.controller.js";
const authRouter = Router();
authRouter.post("/login", Login);
authRouter.post("/register", Register);
authRouter.post("/signout", Signout);
export default authRouter;