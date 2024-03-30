import { sql } from '@vercel/postgres';
import { ProjectsTable, MembersProfilesList } from './definitions';
import { unstable_noStore as noStore } from 'next/cache';
import { getServerSession, Session } from "next-auth";

const ITEMS_PER_PAGE = 6;
export async function fetchSearchedProjects(
  query: string,
  currentPage: number
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const session: Session | null = await getServerSession();
    const currentUserEmail = session?.user?.email;
    if (!currentUserEmail) {
      throw new Error('User email is not provided');
    }
    const userResult = await sql<{ user_id: string }>`
      SELECT user_id FROM accounts WHERE email = ${currentUserEmail}
    `;
    const currentUserId = userResult.rows[0]?.user_id;
    if (!currentUserId) {
      throw new Error('User ID not found');
    }

    const projects = await sql<ProjectsTable>`
      SELECT DISTINCT
        projects.project_id,
        projects.project_name,
        projects.start_date,
        projects.end_date,
        projects.category,
        accounts.user_name
      FROM projects
      JOIN accounts ON projects.creator_id = accounts.user_id
      WHERE
        (projects.project_name ILIKE ${`%${query}%`} OR
        projects.category ILIKE ${`%${query}%`} OR
        projects.start_date::text ILIKE ${`%${query}%`} OR
        projects.end_date::text ILIKE ${`%${query}%`})
        AND EXISTS (
          SELECT 1
          FROM projectsmembers
          WHERE projectsmembers.user_id = ${currentUserId} AND projectsmembers.project_id = projects.project_id
        )
      ORDER BY projects.start_date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return projects.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch projects.');
  }
}

export async function fetchProjectsPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM projects
      JOIN accounts ON projects.creator_id = user_id
      WHERE
        projects.project_name ILIKE ${`%${query}%`} OR
        projects.category ILIKE ${`%${query}%`} OR
        projects.start_date::text ILIKE ${`%${query}%`} OR
        projects.end_date::text ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of projects.');
  }
}

export async function fetchMembersProfilesList(id: string) {
  noStore();
  try {
    const data = await sql<MembersProfilesList>`
      SELECT DISTINCT accounts.profile_url
      FROM accounts
      JOIN projectsmembers ON projectsmembers.user_id = accounts.user_id
      WHERE projectsmembers.project_id = ${id}
      LIMIT 5`;

    const profilesList = data.rows.map((project) => ({
      ...project,
    }));
    return profilesList;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}
