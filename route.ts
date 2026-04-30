import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { contactSchema } from '@/components/schemas';
import { env } from '@/components/env';

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

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
    const ip = (request.headers.get("x-forwarded-for") ?? "127.0.0.1").split(",")[0].trim();
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

    if (website) {
      return NextResponse.json({ message: 'Email sent successfully' });
    }

    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: env.CONTACT_EMAIL,
      subject: `Nuevo mensaje de contacto de ${escapeHtml(name)}`,
      html: `
        <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Mensaje:</strong> ${escapeHtml(message)}</p>
      `,
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error al enviar el email:', error);
    return NextResponse.json({ error: 'Fallo al enviar el email.' }, { status: 500 });
  }
}