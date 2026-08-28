import { execSync } from 'child_process';

const branch = process.env.CF_PAGES_BRANCH || process.env.CF_BRANCH || process.env.GIT_BRANCH || process.env.HEAD || '';
console.log(`[deploy] Detected branch: "${branch}"`);

try {
  if (branch === 'main') {
    console.log('[deploy] Executing production deploy (pnpm exec wrangler deploy)...');
    execSync('pnpm exec wrangler deploy', { stdio: 'inherit' });
  } else {
    console.log('[deploy] Executing staging deploy (pnpm exec wrangler deploy --env staging)...');
    try {
      execSync('pnpm exec wrangler deploy --env staging', { stdio: 'inherit' });
    } catch (stagingErr) {
      console.warn('[deploy] Staging env deploy encountered an issue, falling back to standard wrangler deploy...');
      execSync('pnpm exec wrangler deploy', { stdio: 'inherit' });
    }
  }
} catch (error) {
  console.error('[deploy] Deploy script failed:', error.message);
  process.exit(1);
}
