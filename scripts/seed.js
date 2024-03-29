const { db } = require('@vercel/postgres');
const {
  accounts,
} = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function seedAccounts(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS accounts (
        user_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        account_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        date_of_birth DATE NOT NULL,
        phone VARCHAR(255) NOT NULL,
        profile_url VARCHAR(255) NOT NULL
    );
    `;

    console.log(`Created "accounts" table`);

    const insertedUsers = await Promise.all(
      accounts.map(async (account) => {
        const hashedPassword = await bcrypt.hash(account.password, 10);
        return client.sql`
        INSERT INTO "accounts" (user_name, email, password, date_of_birth, phone, profile_url)
        VALUES (${account.user_name}, ${account.email}, ${hashedPassword}, ${account.date_of_birth}, ${account.phone}, ${account.profile_url});
      `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} accounts`);

    return {
      createTable,
      account: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();
  await seedAccounts(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});