/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  /**
   * We use static export so that GitHub Pages can serve the site.
   */
  output: 'export',
  /**
   * When deployed under a repository subpath on GitHub Pages, we need
   * a basePath and assetPrefix. In development we keep them empty so
   * that `/` کار کند.
   */
  basePath:
    process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_BASE_PATH ?? '/lahore-software-houses'
      : '',
  assetPrefix:
    process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_ASSET_PREFIX ?? '/lahore-software-houses/'
      : undefined,
};

export default nextConfig;

