import { EnvVars } from "./env";

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvVars {}
  }
}

export {};