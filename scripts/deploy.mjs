import { execSync } from 'child_process';

// Cloudflare Workers CI checks out a detached HEAD, so git rev-parse returns "HEAD".
// Try multiple strategies to find the real branch name.
function detectBranch() {
  // 1. Try standard CI env vars (Cloudflare Pages / other CI)
  const fromEnv =
    process.env.CF_PAGES_BRANCH ||
    process.env.CF_BRANCH ||
    process.env.GIT_BRANCH ||
    process.env.BRANCH ||
    process.env.HEAD_BRANCH ||
    '';
  if (fromEnv) return fromEnv;

  // 2. Try git symbolic-ref (works when not detached)
  try {
    const ref = execSync('git symbolic-ref --short HEAD', { encoding: 'utf8', stdio: ['pipe','pipe','pipe'] }).trim();
    if (ref && ref !== 'HEAD') return ref;
  } catch { /* detached HEAD — continue */ }

  // 3. In Cloudflare Workers CI the remote ref reveals the branch
  try {
    const refs = execSync('git log -1 --format=%D HEAD', { encoding: 'utf8', stdio: ['pipe','pipe','pipe'] }).trim();
    // refs looks like "HEAD, origin/staging" or "HEAD, origin/main"
    const match = refs.match(/origin\/([^\s,]+)/);
    if (match) return match[1];
  } catch { /* ignore */ }

  return '';
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
