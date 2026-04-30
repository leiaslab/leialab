import * as z from 'zod';

const envSchema = z.object({
  RESEND_API_KEY: z.string().min(1, "RESEND_API_KEY es requerida"),
  UPSTASH_REDIS_REST_URL: z.string().url("UPSTASH_REDIS_REST_URL debe ser una URL válida"),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1, "UPSTASH_REDIS_REST_TOKEN es requerido"),
  CONTACT_EMAIL: z.string().email("CONTACT_EMAIL debe ser un correo válido"),
  // Agrega aquí otras variables como NEXT_PUBLIC_... si las necesitas
});

/**
 * Validamos las variables de entorno. 
 * .parse() lanzará una excepción descriptiva si falta alguna.
 */
export const env = envSchema.parse(process.env);

/**
 * Exportamos el tipo inferido para usarlo en el aumento de tipos global
 */
export type EnvVars = z.infer<typeof envSchema>;