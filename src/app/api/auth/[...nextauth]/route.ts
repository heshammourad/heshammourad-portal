import { handlers } from "@/auth";
export const { GET, POST } = handlers;
export const runtime = "edge"; // optional, but works perfectly on Vercel Edge
