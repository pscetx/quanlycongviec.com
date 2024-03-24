import { sql } from '@vercel/postgres';
import { Account, Category, Project, ProjectAdmin, ProjectMember, Job, JobMember, Report } from './definitions';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchAcccountInfo() {
  noStore();
  try {
    const data = await sql<Account>`SELECT * FROM account`;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}