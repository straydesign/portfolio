import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://2c7603595e5e550532e5178b1e13ebcd@o4511007213289472.ingest.us.sentry.io/4511007226658816",
  tracesSampleRate: process.env.NODE_ENV === "development" ? 1.0 : 0.1,
});
