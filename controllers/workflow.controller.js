// import { serve } from "@upstash/workflow/express";
// import subscription from "../models/subscription.model.js";
// import sendEmail from "../utils/sendEmail.js";
// export const sendReminders = serve(async (context) => {
// const { subscriptionId } = context.requestPayload;
//   // Fetch subscription
// const Subscription = await fetchSubscription(context, subscriptionId);

// if (!Subscription || Subscription.status !== "active") return;

// if (!Subscription.renewalDate) {
//     console.log(`No renewalDate for subscription ${subscriptionId}, skipping workflow`);
//     return;
// }

// const renewalDate = new Date(Subscription.renewalDate);
// if (isNaN(renewalDate.getTime())) {
//     console.log(`Invalid renewalDate for subscription ${subscriptionId}, skipping workflow`);
//     return;
// }


// if (renewalDate < new Date()) {
//     console.log(`Renewal date has passed for Subscription ${subscriptionId}, stopping workflow`);
//     return;
// }
// const oneDayMs = 24 * 60 * 60 * 1000;
// const reminderDate = new Date(renewalDate.getTime() - oneDayMs);

// if (reminderDate > new Date()) {
//     await sleepUntillReminder(context, `Reminder ${reminderDate} days before`, reminderDate);
// }
// await triggerReminder(context, `${reminderDate} days before reminder`, Subscription);
// });

// const fetchSubscription = async (context, subscriptionID) => {
// return await context.run("get subscription", async () => {
//     const sub = await subscription.findById(subscriptionID)
//     .populate("user", "name email")
//     .lean();
//     return sub; // plain object ✅
// });
// };

// const triggerReminder = async (context, stepName, Subscription) => {
//   console.log(`Starting sending Email`);
//   await context.run(stepName, () => {
//     sendEmail({
//       to: Subscription.user.email,
//       subscription: Subscription
//     });
//   });
// };





// async function sleepUntillReminder(context, stepName, reminderDate) {
//   console.log(`Sleeping until ${reminderDate}`);
//   await context.sleepUntil(stepName, reminderDate);
//   console.log("Woke up! Time to send reminderط");
// }






import dayjs from 'dayjs'
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { serve } = require("@upstash/workflow/express");
import Subscription from '../models/subscription.model.js';
import  sendReminderEmail  from '../utils/sendEmail.js'

const REMINDERS = [1]

export const sendReminders = serve(async (context) => {
  const { subscriptionId } = context.requestPayload;
  const subscriptionData = await fetchSubscription(context, subscriptionId);
  if(!subscriptionData || subscriptionData.status !== 'active') return;

  const renewalDate = dayjs(subscriptionData.renewalDate);

  if(renewalDate.isBefore(dayjs())) {
    console.log(`Renewal date has passed for subscription ${subscriptionId}. Stopping workflow.`);
    return;
  }
for (const daysBefore of REMINDERS) {
    const reminderDate = renewalDate.subtract(daysBefore, 'day');

    // ✅ دايما بيعمل sleepUntil حتى لو الوقت فات (Upstash هيتخطاها لو فاتت)
    await context.sleepUntil(`${daysBefore} days before - sleep`, reminderDate.toDate());

    // ✅ بعد الصحيان، شوف هل المفروض نبعت reminder
    if (!reminderDate.isBefore(dayjs(), 'day')) {
      await context.run(`${daysBefore} days before - reminder`, async () => {
        console.log(`Triggering ${daysBefore} days before reminder`);
        await sendReminderEmail(
          subscriptionData.user.email,
          subscriptionData,
        );
      });
    }
  }
});

const fetchSubscription = async (context, subscriptionId) => {
  return await context.run('get subscription', async () => {
    return Subscription.findById(subscriptionId).populate('user', 'name email');
  })
}

const sleepUntilReminder = async (context, label, date) => {
  console.log(`Sleeping until ${label} reminder at ${date}`);
  await context.sleepUntil(label, date.toDate());
}

const triggerReminder = async (context, label, subscription) => {
  return await context.run(label, async () => {
    console.log(`Triggering ${label} reminder`);

    await sendReminderEmail({
      to: subscription.user.email,
      subscription,
    })
  })
}