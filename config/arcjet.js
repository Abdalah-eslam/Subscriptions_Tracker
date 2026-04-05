import arcjet, { tokenBucket } from "@arcjet/node";
import {ARCJET_KEY} from "../config/env.js";
const aj = arcjet({
  key:ARCJET_KEY, // Get your site key from https://app.arcjet.com
  rules: [
    // Create a token bucket rate limit. Other algorithms are supported.
    tokenBucket({
      mode: "LIVE", // will block requests. Use "DRY_RUN" to log only
      refillRate: 5, // refill 5 tokens per interval
      interval: 15, // refill every 10 seconds
      capacity: 5, // bucket maximum capacity of 10 tokens
    }),
  ],
});

export default aj;