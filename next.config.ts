import type { NextConfig } from "next";
import { execSync } from "child_process";
import createNextIntlPlugin from "next-intl/plugin";

let gitHash = "dev";
let gitCommitCount = "0";
try {
  gitHash = execSync("git rev-parse --short HEAD").toString().trim();
  gitCommitCount = execSync("git rev-list --count HEAD").toString().trim();
} catch {
  // fallback for builds without git
}

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_GIT_HASH: gitHash,
    NEXT_PUBLIC_GIT_COMMIT_COUNT: gitCommitCount,
    NEXT_PUBLIC_BUILD_TIME: new Date().toISOString(),
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
