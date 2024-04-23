import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import { sql } from '@vercel/postgres';

export async function POST(request: Request) {
  try {
    const { email, password, user_name } = await request.json();
    console.log({ email, password, user_name });

    const hashedPassword = await hash(password, 10);

    const response = await sql`
      INSERT INTO accounts (email, password, user_name, profile_url)
      VALUES (${email}, ${hashedPassword}, ${user_name}, '/users/default.jpg')
    `;
  } catch (e) {
    console.log({ e });
  }

  return NextResponse.json({ message: 'success' });
}
