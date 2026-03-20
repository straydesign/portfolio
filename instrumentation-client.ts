import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://2c7603595e5e550532e5178b1e13ebcd@o4511007213289472.ingest.us.sentry.io/4511007226658816",
  tracesSampleRate: process.env.NODE_ENV === "development" ? 1.0 : 0.1,
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 1.0,
  integrations: (integrations) =>
    integrations.filter((i) => i.name !== "Replay"),
});

// Lazy-load Sentry Replay after page is interactive
if (typeof window !== "undefined") {
  window.addEventListener(
    "load",
    () => {
      setTimeout(() => {
        import("@sentry/nextjs").then((SentryModule) => {
          const client = SentryModule.getClient();
          if (client) {
            client.addIntegration(
              SentryModule.replayIntegration()
            );
            // Now enable session replays
            const replay = client.getIntegrationByName("Replay");
            if (replay && "start" in replay) {
              (replay as { start: () => void }).start();
            }
          }
        });
      }, 5000);
    },
    { once: true }
  );
}

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
