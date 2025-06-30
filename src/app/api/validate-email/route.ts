import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validation basique de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Format d\'email invalide' },
        { status: 400 }
      );
    }

    // Vérification du domaine (exemple)
    const domain = email.split('@')[1];
    const blockedDomains = ['tempmail.com', '10minutemail.com'];
    if (blockedDomains.includes(domain)) {
      return NextResponse.json(
        { error: 'Domaine d\'email temporaire non autorisé' },
        { status: 400 }
      );
    }

    // Si tout est OK, rediriger vers l'API newsletter
    const newsletterResponse = await fetch(`${process.env.NEWSLETTER_SERVICE_URL}/api/newsletter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const result = await newsletterResponse.json();

    return NextResponse.json(result, { status: newsletterResponse.status });

  } catch (error) {
    console.error('Erreur validation email:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
} 