import e from "express";
import mongoose from "mongoose";    

const subscriptionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Subscription name is required"],
            trim: true,
            minlength: [2, "Subscription name must be at least 2 characters long"],
            maxlength: [100, "Subscription name must be less than 100 characters long"]
        },
        price: {
            type: Number,
            required: [true, "Price is required"],
            min: [0, "Price must be a positive number"],
            max: [10000, "Price must be less than 10000"]
        },
        currency: {
            type: String,
            enum: ["USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY", "SEK", "NZD"],
            default: "USD"
        },
        frequency: {
            type: String,
            enum: ["daily", "weekly", "monthly", "yearly"],
            required: [true, "Frequency is required"]
        },
        category: {
            type: String,
            enum: [ "Entertainment", "Productivity", "Health & Fitness", "Education", "Utilities", "Other"],
            required: [true, "Category is required"]
        }, 
        paymentMethod: {
            type: String,
            required : [true, "Payment method is required"],
            trim: true,
        },
        status: {
            type: String,
            enum: ["active", "expired", "cancelled"],
            default: "active"
        },
        startDate: {
            type: Date,
            required: [true, "Start date is required"],
            validate: {
                validator: function(value) {
                    return value <= new Date();
                },
                message: "Start date cannot be in the future"
            }
        },
        renewalDate: {
            type: Date,
            validate: {
                validator: function(value) {
                    return value >= this.startDate;
                },
                message: "Renewal date must be after start date"
            }
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User reference is required"],
            index: true
        }
    }, { timestamps: true }
);

subscriptionSchema.pre("save",async function() {
    if (!this.renewalDate ) {
            const renewalPeriods = {
        daily: 1,
        weekly: 7,
        monthly: 30,
        yearly: 365
    };
    this.renewalDate = new Date(this.startDate)
    this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);

    }
    if (this.renewalDate < new Date()) {
        this.status = "expired"; }
});

subscriptionSchema.virtual("Computedstatus").get(function () {
    if (this.status === "cancelled") return "cancelled";

    return this.renewalDate < new Date() ? "expired" : "active";
});
const Subscription = mongoose.model("Subscription", subscriptionSchema);


export default Subscription;