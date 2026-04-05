import Subscription from '../models/subscription.model.js';
export const createSubscription =async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user
        })
        res.status(201).json({
            success: true,
            message: "Subscription created successfully",
            data: subscription
        })

    } catch (error) {
        next(error);
    }
}
export const getUserSubscription =async (req, res, next) => {
    
    try {
        if (req.user !== req.params.id) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized access"
            });
        }
        const subscription = await Subscription.find({ user: req.params.id });
        res.status(200).json({
            success: true,
            message: "Subscription found successfully",
            data: subscription
        });
    } catch (error) {
        next(error);
    }
}
export const updateSubscription =async (req, res, next) => {
    try {
        const subscription = await Subscription.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!subscription) {
            return res.status(404).json({
                success: false,
                message: "Subscription not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Subscription updated successfully",
            data: subscription
        });
    } catch (error) {
        next(error);
    }
}
export const deleteSubscription =async (req, res, next) => {
    try {
        const subscription = await Subscription.findByIdAndDelete(req.params.id);
        if (!subscription) {
            return res.status(404).json({
                success: false,
                message: "Subscription not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Subscription deleted successfully",
            data: subscription
        });
    } catch (error) {
        next(error);
    }
}
export const getUpcomingRenewals =async (req, res, next) => {
    try {
        const upcomingRenewals = await Subscription.find({
            status: "active", renewalDate: { $gte: new Date() }, user: req.user})
        res.status(200).json({
            success: true,
            message: "Upcoming renewals found successfully",
            data: upcomingRenewals
        });
    } catch (error) {
        next(error);
    }
}
export const cancelSubscription =async (req, res, next) => {
        try {
            const subscription = await Subscription.findById(req.params.id);
            if (!subscription) {
                return res.status(404).json({
                    success: false,
                    message: "Subscription not found"
                });
            } 
                const newSubscription = await Subscription.findByIdAndUpdate(req.params.id, { status: "cancelled" }, { returnDocument: 'after' });
                res.status(200).json({
                    success: true,
                    message: "Subscription canceled successfully",
                    data: newSubscription
                });
        } catch (error) {
            next(error);
        }
}
export const getSubscriptionbyID =async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);
        if (!subscription) {
            return res.status(404).json({
                success: false,
                message: "Subscription not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Subscription found successfully",
            data: subscription
        });
        
    } catch (error) {
        next(error);
    }
}