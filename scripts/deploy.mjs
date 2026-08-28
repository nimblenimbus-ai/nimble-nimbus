import { execSync } from 'child_process';

// Cloudflare Pages exposes CF_PAGES_BRANCH during build but not always deploy.
// Fall back to reading git HEAD directly.
function detectBranch() {
  const fromEnv =
    process.env.CF_PAGES_BRANCH ||
    process.env.CF_BRANCH ||
    process.env.GIT_BRANCH ||
    process.env.HEAD ||
    process.env.BRANCH ||
    '';

  if (fromEnv) return fromEnv;

  try {
    return execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim();
  } catch {
    return '';
  }
}

const branch = detectBranch();
console.log(`[deploy] Detected branch: "${branch}"`);

try {
  if (branch === 'main') {
    console.log('[deploy] → Production deploy (pnpm exec wrangler deploy)...');
    execSync('pnpm exec wrangler deploy', { stdio: 'inherit' });
  } else {
    console.log('[deploy] → Staging deploy (pnpm exec wrangler deploy --env staging)...');
    execSync('pnpm exec wrangler deploy --env staging', { stdio: 'inherit' });
  }
} catch (error) {
  console.error('[deploy] Deploy failed:', error.message);
  process.exit(1);
}
