import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import * as z from 'zod';
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { contactSchema } from './schemas';
import { env } from './env';

// Configuración de Rate Limit usando Redis de Upstash
const redis = new Redis({
  url: env.UPSTASH_REDIS_REST_URL,
  token: env.UPSTASH_REDIS_REST_TOKEN,
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, "10 m"), // Máximo 3 envíos cada 10 minutos
  analytics: true,
});

const resend = new Resend(env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") ?? "127.0.0.1";
    const { success, limit, reset, remaining } = await ratelimit.limit(ip);

    if (!success) {
      return NextResponse.json(
        { error: 'Demasiados intentos. Por favor, intentá más tarde.' },
        { status: 429, headers: { "X-RateLimit-Limit": limit.toString(), "X-RateLimit-Reset": reset.toString() } }
      );
    }

    const body = await request.json();
    
    // Validamos el cuerpo de la petición con Zod
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: 'Datos inválidos', details: result.error.format() }, { status: 400 });
    }

    const { name, email, message, website } = result.data;

    // Si el campo honeypot tiene valor, es un bot
    if (website) {
      return NextResponse.json({ message: 'Email sent successfully (honeypot)' });
    }

    const data = await resend.emails.send({
      from: 'onboarding@resend.dev', 
      to: env.CONTACT_EMAIL,
      subject: `Nuevo mensaje de contacto de ${name}`,
      html: `
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong> ${message}</p>
      `,
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error al enviar el email:', error);
    return NextResponse.json({ error: 'Fallo al enviar el email.' }, { status: 500 });
  }
}