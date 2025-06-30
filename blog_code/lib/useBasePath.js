// lib/useBasePath.js
export function getBasePath() {
  // Check if we're in build time or runtime
  if (typeof window === 'undefined') {
    // Build time - use environment variable
    return process.env.DEPLOY_TARGET === 'GH_PAGES' ? '/Blog_page' : '';
  } else {
    // Runtime - check if we're on GitHub Pages
    const isGithubPages = window.location.hostname === 'rafi1105.github.io';
    return isGithubPages ? '/Blog_page' : '';
  }
}

export function getAssetPath(path) {
  const basePath = getBasePath();
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return basePath ? `${basePath}/${cleanPath}` : `/${cleanPath}`;
}
