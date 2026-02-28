import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const rateLimit = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5;
const RATE_LIMIT_WINDOW = 60 * 1000;

function getClientIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  return forwarded ? forwarded.split(',')[0].trim() : 'unknown';
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimit.get(ip);

  if (!record || now > record.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }

  if (record.count >= RATE_LIMIT) {
    return true;
  }

  record.count++;
  return false;
}

function sanitizeInput(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .slice(0, 5000);
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(request: Request) {
  const clientIP = getClientIP(request);

  if (isRateLimited(clientIP)) {
    return NextResponse.json(
      { error: 'Demasiadas solicitudes. Intenta más tarde.' },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const { nombre, email, interes, mensaje } = body;

    if (!nombre || !email || !mensaje) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    const sanitizedNombre = sanitizeInput(nombre as string);
    const sanitizedEmail = sanitizeInput(email as string);
    const sanitizedMensaje = sanitizeInput(mensaje as string);
    const sanitizedInteres = sanitizeInput(interes as string || '');

    if (!isValidEmail(sanitizedEmail)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    if (sanitizedMensaje.length < 10) {
      return NextResponse.json(
        { error: 'El mensaje debe tener al menos 10 caracteres' },
        { status: 400 }
      );
    }

    const interesText: Record<string, string> = {
      ponencia: 'Dar una Ponencia',
      colaboracion: 'Colaboración en Investigación',
      visita: 'Visita Técnica',
      otro: 'Otros'
    };

    const data = await resend.emails.send({
      from: 'ML Lab <contacto@dsc-utp.site>',
      to: ['mllab@utp.edu.co'],
      subject: `Nueva propuesta de ${sanitizedNombre} - ${interesText[sanitizedInteres] || sanitizedInteres}`,
      html: `
        <h2>Nueva propuesta de contacto</h2>
        <p><strong>Nombre:</strong> ${sanitizedNombre}</p>
        <p><strong>Email:</strong> ${sanitizedEmail}</p>
        <p><strong>Área de interés:</strong> ${interesText[sanitizedInteres] || sanitizedInteres}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${sanitizedMensaje}</p>
      `,
    });

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: 'Error al enviar el email' },
      { status: 500 }
    );
  }
}
