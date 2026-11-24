import { EnvVars } from "./env";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      RESEND_API_KEY: EnvVars["RESEND_API_KEY"];
      UPSTASH_REDIS_REST_URL: EnvVars["UPSTASH_REDIS_REST_URL"];
      UPSTASH_REDIS_REST_TOKEN: EnvVars["UPSTASH_REDIS_REST_TOKEN"];
      CONTACT_EMAIL: EnvVars["CONTACT_EMAIL"];
    }
  }
}

export {};
