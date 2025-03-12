import cron from "node-cron";
import Ad from "../models/adModel.js";

cron.schedule("* * * * *", async () => {    
    await Ad.updateMany(
      { expiredAt: { $lte: new Date() }, isExpire: false },
      { $set: { isExpire: true } }
    );

});
