// lib/environment.js
export function isGitHubPages() {
  if (typeof window === 'undefined') {
    // Server-side: check environment variables
    return process.env.DEPLOY_TARGET === 'GH_PAGES';
  } else {
    // Client-side: check hostname
    return window.location.hostname === 'rafi1105.github.io';
  }
}

export function shouldSkipAPI() {
  return isGitHubPages();
}
