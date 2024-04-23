import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import { sql, QueryResult, QueryResultRow } from '@vercel/postgres';

export async function POST(request: Request) {
  try {
    const { email, password, user_name } = await request.json();
    console.log({ email, password, user_name });

    const hashedPassword = await hash(password, 10);

    // Insert user details into accounts table
    const accountResponse: QueryResult<QueryResultRow> = await sql`
      INSERT INTO accounts (email, password, user_name, profile_url)
      VALUES (${email}, ${hashedPassword}, ${user_name}, '/users/default.jpg')
      RETURNING user_id;
    `;

    const userId = accountResponse.rows[0].user_id;

    await sql`
      INSERT INTO categories (user_id, category)
      VALUES (${userId}, 'Default');
    `;
  } catch (e) {
    console.log({ e });
    return NextResponse.json({ message: 'error' });
  }

  return NextResponse.json({ message: 'success' });
}
