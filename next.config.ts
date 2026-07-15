import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  skipTrailingSlashRedirect: true,
  async rewrites() {
    const isDev = process.env.NODE_ENV === "development";
    
    // Default development and production destinations
    const READING_LIST_URL = process.env.READING_LIST_URL || (isDev ? "http://localhost:3001" : "https://heshammourad-reading-list.vercel.app");
    const SPOTIFY_TOOLS_URL = process.env.SPOTIFY_TOOLS_URL || (isDev ? "http://localhost:3002" : "https://heshammourad-spotify.vercel.app");

    return [
      // Rewrites for /reading-list
      {
        source: "/reading-list",
        destination: `${READING_LIST_URL}/reading-list`,
      },
      {
        source: "/reading-list/:path*",
        destination: `${READING_LIST_URL}/reading-list/:path*`,
      },
      // Rewrites for /spotify-tools
      {
        source: "/spotify-tools",
        destination: `${SPOTIFY_TOOLS_URL}/spotify-tools`,
      },
      {
        source: "/spotify-tools/:path*",
        destination: `${SPOTIFY_TOOLS_URL}/spotify-tools/:path*`,
      },
    ];
  },
};

export default nextConfig;
