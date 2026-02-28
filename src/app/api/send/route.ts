import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nombre, email, interes, mensaje } = body;

    if (!nombre || !email || !mensaje) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    const interesText: Record<string, string> = {
      ponenecia: 'Dar una Ponencia',
      colaboracion: 'Colaboración en Investigación',
      visita: 'Visita Técnica',
      otro: 'Otros'
    };

    const data = await resend.emails.send({
      from: 'ML Lab <contacto@dsc-utp.site>',
      to: ['mllab@utp.edu.co'],
      subject: `Nueva propuesta de ${nombre} - ${interesText[interes] || interes}`,
      html: `
        <h2>Nueva propuesta de contacto</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Área de interés:</strong> ${interesText[interes] || interes}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${mensaje}</p>
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
