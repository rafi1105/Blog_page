/** @type {import('next').NextConfig} */
const isGithubPages = process.env.DEPLOY_TARGET === 'GH_PAGES';
const isStaticExport = process.env.BUILD_MODE === 'static' || isGithubPages;

const repoName = 'Blog_page'; // Use your repo name here

const nextConfig = {
  ...(isStaticExport && { output: 'export' }), // Only use static export when explicitly building for static
  basePath: isGithubPages ? `/${repoName}` : '',
  assetPrefix: isGithubPages ? `/${repoName}/` : '',
  images: {
    unoptimized: true, // Required for static export - disables Image Optimization API
  },
  ...(isStaticExport && { 
    trailingSlash: true, // Required for static export
    skipTrailingSlashRedirect: true 
  }),
};

module.exports = nextConfig;