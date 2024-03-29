import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';
import { sql } from '@vercel/postgres';
import type { Accounts } from '@/app/lib/definitions';
import { z } from 'zod';

async function getUser(email: string): Promise<Accounts | undefined> {
  try {
    const user = await sql<Accounts>`SELECT * FROM accounts WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

const handler = NextAuth({
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/',
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {

        const parsedCredentials = z
            .object({email: z.string().email(), password: z.string().min(6),})
          .safeParse(credentials);
        
        if (parsedCredentials.success) {
            const { email, password } = parsedCredentials.data;
            const user = await getUser(email);
            if (!user) return null;
            const passwordsMatch = await compare(password, user.password);
            if (passwordsMatch) {
          return {
            id: user.user_id,
            email: user.email,
          };
        }
        }
 
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
