/** @type {import('next').NextConfig} */
const isGithubPages = process.env.DEPLOY_TARGET === 'GH_PAGES';

const repoName = 'Blog_page'; // Use your repo name here

const nextConfig = {
  output: 'export', // Required for static export
  basePath: isGithubPages ? `/${repoName}` : '',
  assetPrefix: isGithubPages ? `/${repoName}/` : '',
};

module.exports = nextConfig;