
import arcjet, { shield, detectBot, tokenBucket, slidingWindow } from "@arcjet/node";
import { env } from "./env.js";

let aj;
if (env.ARCJET_KEY) {
  aj = arcjet({
    key: env.ARCJET_KEY,
    rules: [
      shield({ mode: "LIVE" }),
      detectBot({
        mode: "LIVE",
        allow: ["CATEGORY:SEARCH_ENGINE"],
      }),
      slidingWindow({
        mode: "LIVE",
        max: 60,
        interval: 60,
      }),
    ],
  });
} else {
  aj = null;
}

export default aj;
