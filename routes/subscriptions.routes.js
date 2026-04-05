import { Router } from "express";
import {  createSubscription, updateSubscription, deleteSubscription, getUserSubscription, cancelSubscription, getUpcomingRenewals ,getSubscriptionbyID} from "../controllers/subscription.controller.js";
import { authorize } from "../middlewares/authMidlleware.js";
const subscriptionRouter = Router();
subscriptionRouter.use(authorize);
subscriptionRouter.get("/", (req, res) => {
    res.json({ message: "Hello From  subscriptions API" });
});
subscriptionRouter.get("/:id", getSubscriptionbyID);
subscriptionRouter.post("/",createSubscription); /// Create subscription
subscriptionRouter.put("/:id",  updateSubscription);    // Update subscription
subscriptionRouter.delete("/:id", deleteSubscription); // Delete subscription
subscriptionRouter.get("/users/:id",getUserSubscription);// Get user subscriptions
subscriptionRouter.put("/:id/cancel", cancelSubscription);
subscriptionRouter.get("/user/upcoming-renewals", getUpcomingRenewals); // Get upcoming renewals
export default subscriptionRouter;