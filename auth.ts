import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import type { Account } from '@/app/lib/definitions';
import bcrypt from 'bcryptjs';

async function getAccount(email: string): Promise<Account | undefined> {
  try {
    const account = await sql<Account>`SELECT * FROM account WHERE email=${email}`;
    return account.rows[0];
  } catch (error) {
    console.error('Failed to fetch account:', error);
    throw new Error('Failed to fetch account.');
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
            .object({ email: z.string().email(), password: z.string().min(6) })
            .safeParse(credentials);
        
        if (parsedCredentials.success) {
            const { email, password } = parsedCredentials.data;
            const account = await getAccount(email);
            if (!account) return null;
          const passwordsMatch = await bcrypt.compare(password, account.password);
          if (passwordsMatch) return account;
        }
        
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});