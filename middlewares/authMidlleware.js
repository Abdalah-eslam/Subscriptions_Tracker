import jwt from "jsonwebtoken";
import {JWT_SECRET} from "../config/env.js";
export const authorize = function (req, res, next)  {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }
    else if (req.cookies.token){
        token = req.cookies.token;
    }
    if (!token) {
        const error = new Error("Not authorized, no token");
        error.status = 401;
        return next(error);
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.userId;
    next();

}

