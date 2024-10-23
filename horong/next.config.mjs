import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  scope: "/app",
  sw: "service-worker.js",
});

const nextConfig = {};
export default withPWA(nextConfig);
