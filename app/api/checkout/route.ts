import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { PRODUCT, SHIPPING_EUR } from '@/lib/product';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { items, origin } = body;

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Košarica je prazna.' }, { status: 400 });
    }

    const normalized = [];
    for (const item of items) {
      const quantity = Number(item?.quantity);
      if (item?.id !== PRODUCT.id || !Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
        return NextResponse.json({ error: 'Košarica vsebuje neveljaven izdelek.' }, { status: 400 });
      }
      normalized.push({ quantity });
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || origin || 'http://localhost:3000';

    if (!process.env.STRIPE_SECRET_KEY) {
      console.log('DEMO MODE: No STRIPE_SECRET_KEY found. Redirecting to success page.');
      await new Promise(resolve => setTimeout(resolve, 1500));
      return NextResponse.json({ url: baseUrl + '/order-success?session_id=demo_mode_12345' });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2026-07-29.dahlia',
    });

    const imageUrl = `${baseUrl}${PRODUCT.cartImage}`;
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = normalized.map((item) => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: PRODUCT.name,
          images: [imageUrl],
        },
        unit_amount: Math.round(PRODUCT.price * 100),
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: 'eur',
        product_data: {
          name: 'Dostava',
        },
        unit_amount: Math.round(SHIPPING_EUR * 100),
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'paypal'],
      line_items,
      mode: 'payment',
      invoice_creation: {
        enabled: true,
      },
      payment_intent_data: {
        receipt_email: undefined, // Stripe handles this automatically when collecting customer email or during invoice creation
      },
      shipping_address_collection: {
        allowed_countries: ['SI'], 
      },
      phone_number_collection: {
        enabled: true,
      },
      billing_address_collection: 'auto',
      success_url: baseUrl + '/order-success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: baseUrl + '/blagajna',
      custom_text: {
        submit: {
          message: "Hvala za vaše naročilo! Račun vam bomo poslali na e-mail po uspešnem plačilu.",
        },
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    console.error('Error creating checkout session:', error);
    const message = error instanceof Error ? error.message : 'Plačila ni bilo mogoče začeti.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}


