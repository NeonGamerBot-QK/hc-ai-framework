import { version } from "../package.json"
export const DEFAULT_BASE_URL =
  process.env.API_BASE_URL_OVERRIDE || "https://ai.hackclub.com";
export const USER_AGENT = `Hackclub-Ai-Framework/${version}