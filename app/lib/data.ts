import { sql } from '@vercel/postgres';
import { ProjectsTable, MembersProfilesList, MembersField, Categories, ProjectForm, JobsTable, JobForm, Accounts, JobPercentage, JobsNotifications } from './definitions';
import { unstable_noStore as noStore } from 'next/cache';
import { getServerSession, Session } from "next-auth";

const ITEMS_PER_PAGE = 4;

export async function getCurrentUserId(session: Session | null): Promise<string> {
  const currentUserEmail = session?.user?.email;
  if (!currentUserEmail) {
    throw new Error('User email is not provided');
  }
  const userResult = await sql<{ user_id: string }>`
    SELECT user_id FROM accounts WHERE email = ${currentUserEmail}
  `;
  const currentUserId = userResult.rows[0]?.user_id;
  if (!currentUserId) {
    throw new Error('User Id not found');
  }
  return currentUserId;
}

export async function fetchUserById(id: string) {
  noStore();
  try {
    const data = await sql<Accounts>`
      SELECT
        accounts.user_id,
        accounts.user_name,
        accounts.email,
        accounts.password,
        accounts.date_of_birth,
        accounts.phone,
        accounts.profile_url
      FROM accounts
      WHERE accounts.user_id = ${id};
    `;

    const acc = data.rows.map((acc) => ({
      ...acc,
    }));

    console.log(acc);
    return acc[0];
  } catch (error: any) {
    console.error('Database Error:', error);
    throw new Error(`Failed to fetch account: ${(error as Error).message}`);
  }
}

export async function fetchSearchedProjects(
  query: string,
  currentPage: number,
) {
  noStore();
  try {
    const session: Session | null = await getServerSession();
    const currentUserId = await getCurrentUserId(session);

    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    const projects = await sql<ProjectsTable>`
    SELECT DISTINCT
      projects.project_id,
      projects.project_name,
      projects.start_date,
      projects.end_date,
      projects.category,
      projects.description,
      accounts.user_name
    FROM projects
    JOIN accounts ON projects.creator_id = accounts.user_id
    WHERE (
      projects.project_name ILIKE ${`%${query}%`} OR
      projects.category ILIKE ${`%${query}%`} OR
      accounts.user_name::text ILIKE ${`%${query}%`} OR
      (${query} BETWEEN projects.start_date::text AND projects.end_date::text)
    )
    AND (
      EXISTS (
        SELECT 1
        FROM projectsmembers
        WHERE projectsmembers.user_id = ${currentUserId} AND projectsmembers.project_id = projects.project_id
      )
      OR EXISTS (
        SELECT 1
        FROM projectsadmins
        WHERE projectsadmins.user_id = ${currentUserId} AND projectsadmins.project_id = projects.project_id
      )
    )
    ORDER BY category ASC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return projects.rows;
  } catch (error: any) {
    console.error('Database Error:', error);
    throw new Error(`Failed to fetch projects: ${(error as Error).message}`);
  }
}

export async function fetchProjectsPages(query: string) {
  noStore();
  try {
    const session: Session | null = await getServerSession();
    const currentUserId = await getCurrentUserId(session);

    const count = await sql`
    SELECT COUNT(*)
    FROM projects
      JOIN accounts ON projects.creator_id = accounts.user_id
      WHERE (
        projects.project_name ILIKE ${`%${query}%`} OR
      projects.category ILIKE ${`%${query}%`} OR
      accounts.user_name::text ILIKE ${`%${query}%`} OR
      (${query} BETWEEN projects.start_date::text AND projects.end_date::text)
      )
      AND (
        EXISTS (
          SELECT 1
          FROM projectsmembers
          WHERE projectsmembers.user_id = ${currentUserId} AND projectsmembers.project_id = projects.project_id
        )
        OR EXISTS (
          SELECT 1
          FROM projectsadmins
          WHERE projectsadmins.user_id = ${currentUserId} AND projectsadmins.project_id = projects.project_id
        )
      )
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
      SELECT DISTINCT accounts.profile_url, accounts.email, accounts.user_name
      FROM accounts
      JOIN projectsmembers ON projectsmembers.user_id = accounts.user_id
      WHERE projectsmembers.project_id = ${id}`;

    const profilesList = data.rows.map((project) => ({
      ...project,
    }));
    return profilesList;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch members.');
  }
}

export async function fetchProjectById(id: string) {
  noStore();
  const session: Session | null = await getServerSession();
  const currentUserId = await getCurrentUserId(session);

  try {
    const data = await sql<ProjectForm>`
      SELECT
        projects.project_id,
        projects.project_name,
        projects.category,
        projects.start_date,
        projects.end_date,
        projects.description,
        projects.creator_id,
        categories.category,
        accounts.user_name,
        accounts.email
      FROM projects
      JOIN 
        categories ON categories.user_id = ${currentUserId}
      JOIN
        accounts ON projects.creator_id = accounts.user_id
      WHERE projects.project_id = ${id};
    `;

    const project = data.rows.map((project) => ({
      ...project,
    }));

    console.log(project);
    return project[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch project.');
  }
}

export async function fetchProjectsMembers(id: string) {
  noStore();
  try {
    const data = await sql<MembersField>`
    SELECT
      accounts.user_id,
      accounts.user_name,
      accounts.profile_url,
      accounts.email,
      COUNT(jobsmembers.job_id) AS job_count
    FROM 
      accounts
    LEFT JOIN 
      jobsmembers ON accounts.user_id = jobsmembers.user_id
    LEFT JOIN 
      projectsmembers ON accounts.user_id = projectsmembers.user_id
    WHERE 
      projectsmembers.project_id = ${id}
    GROUP BY 
      accounts.user_id, accounts.user_name, accounts.profile_url, accounts.email
    ORDER BY 
      accounts.user_name ASC;
    `;
    const members = data.rows;
    return members;
  } catch (error: any) {
    console.error('Database Error:', error);
    throw new Error(`Failed to fetch members: ${(error as Error).message}`);
  }
}

export async function fetchProjectsAdmins(id: string) {
  noStore();
  try {
    const data = await sql<MembersField>`
      SELECT
        user_id,
        user_name,
        profile_url,
        email
      FROM accounts
      WHERE EXISTS (
          SELECT 1 
          FROM projectsadmins
          WHERE projectsadmins.user_id = accounts.user_id
          AND projectsadmins.project_id = ${id}
      )
      ORDER BY user_name ASC
    `;
    const members = data.rows;
    return members;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch members.');
  }
}

export async function fetchMembers() {
  noStore();
  const session: Session | null = await getServerSession();
  const currentUserId = await getCurrentUserId(session);

  try {
    const data = await sql<MembersField>`
      SELECT
        user_id,
        user_name,
        profile_url,
        email
      FROM accounts
      WHERE user_id != ${currentUserId}
      ORDER BY user_name ASC
    `;
    const members = data.rows;
    return members;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all members.');
  }
}

export async function fetchCategories() {
  noStore();
  const session: Session | null = await getServerSession();
  const currentUserId = await getCurrentUserId(session);
  
  try {
    const data = await sql<Categories>`
      SELECT
        category
      FROM categories
      WHERE user_id = ${currentUserId}
    `;
    const categories = data.rows.map(row => row.category);
    return categories;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all categories.');
  }
}

export async function fetchJobs(id: string) {
  noStore();
  try {
    const jobs = await sql<JobsTable>`
    SELECT
      jobs.job_id,
      jobs.project_id,
      jobs.job_name,
      jobs.creator_id,
      jobs.description,
      jobs.status,
      jobs.deadline,
      jobs.result_url,
      accounts.user_name
    FROM jobs
    JOIN accounts ON jobs.creator_id = accounts.user_id
    WHERE jobs.project_id = ${id}
    ORDER BY jobs.deadline ASC
    `;

    return jobs.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch jobs.');
  }
}

export async function fetchJobsMembersProfilesList(id: string) {
  noStore();
  try {
    const data = await sql<MembersProfilesList>`
      SELECT DISTINCT accounts.profile_url, accounts.email, accounts.user_name
      FROM accounts
      JOIN jobsmembers ON jobsmembers.user_id = accounts.user_id
      WHERE jobsmembers.job_id = ${id}`;

    const profilesList = data.rows.map((job) => ({
      ...job,
    }));
    return profilesList;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch members.');
  }
}

export async function fetchJobById(id: string) {
  noStore();
  try {
    const data = await sql<JobForm>`
      SELECT
        jobs.job_id,
        jobs.project_id,
        jobs.job_name,
        jobs.description,
        jobs.status,
        jobs.deadline,
        jobs.result_url,
        accounts.user_name
      FROM jobs
      JOIN accounts ON accounts.user_id = jobs.creator_id
      WHERE jobs.job_id = ${id}
    `;

    const job = data.rows.map((job) => ({
      ...job,
    }));

    console.log(job);
    return job[0];
  } catch (error: any) {
    console.error('Database Error:', error);
    throw new Error(`Failed to fetch job: ${(error as Error).message}`);
  }
}

export async function fetchJobsMembers(id: string) {
  noStore();
  try {
    const data = await sql<MembersField>`
      SELECT
        user_id,
        user_name,
        profile_url,
        email
      FROM accounts
      WHERE EXISTS (
          SELECT 1 
          FROM jobsmembers
          WHERE jobsmembers.user_id = accounts.user_id
          AND jobsmembers.job_id = ${id}
      )
      ORDER BY user_name ASC
    `;
    return data.rows;
  } catch (error: any) {
    console.error('Database Error:', error);
    throw new Error(`Failed to fetch members: ${(error as Error).message}`);
  }
}

export async function isUserProjectAdmin(projectId: string): Promise<boolean> {
  noStore();
  const session: Session | null = await getServerSession();
  const currentUserId = await getCurrentUserId(session);

  try {
    const data = await sql<MembersField>`
      SELECT 1
      FROM projectsadmins
      WHERE projectsadmins.user_id = ${currentUserId}
      AND projectsadmins.project_id = ${projectId}
      LIMIT 1
    `;
    return data.rows.length > 0;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to check if user is project admin.');
  }
}

export async function fetchJobPercentage(id: string, status: string) {
  noStore();
  try {
    const data = await sql<JobPercentage>`
      SELECT
        projects.project_id,
        projects.project_name,
        COUNT(jobs.job_id) AS total_jobs,
        SUM(CASE WHEN jobs.status = ${status} THEN 1 ELSE 0 END) AS total_specified_jobs,
        CASE 
          WHEN COUNT(jobs.job_id) = 0 THEN 0 -- Set percent_completed to 0 if total_jobs is 0
          ELSE ROUND((SUM(CASE WHEN jobs.status = ${status} THEN 1 ELSE 0 END) * 100.0 / COUNT(jobs.job_id)), 1)
        END AS percent_completed
      FROM 
        projects
      LEFT JOIN 
        jobs ON projects.project_id = jobs.project_id
      WHERE 
        projects.project_id = ${id}
      GROUP BY 
        projects.project_id, projects.project_name;
    `;

    const job = data.rows.map((job) => ({
      ...job,
    }));

    return job[0];
  } catch (error: any) {
    console.error('Database Error:', error);
    throw new Error(`Failed to fetch job percentage: ${(error as Error).message}`);
  }
}

export async function fetchUsersJobs(id: string) {
  noStore();
  const session: Session | null = await getServerSession();
  const currentUserId = await getCurrentUserId(session);

  try {
    const data = await sql<JobsTable>`
      SELECT
        jobs.job_id,
        jobs.project_id,
        jobs.job_name,
        jobs.creator_id,
        jobs.description,
        jobs.status,
        jobs.deadline,
        jobs.result_url,
        accounts.user_name
      FROM jobs
      JOIN accounts ON jobs.creator_id = accounts.user_id
      WHERE jobs.project_id = ${id}
      AND EXISTS (
        SELECT 1
        FROM projectsmembers
        WHERE projectsmembers.user_id = ${currentUserId}
        AND projectsmembers.project_id = jobs.project_id
      )
      AND EXISTS (
        SELECT 1
        FROM jobsmembers
        WHERE jobsmembers.user_id = ${currentUserId}
        AND jobsmembers.job_id = jobs.job_id
      )
      ORDER BY jobs.deadline ASC;
    `;
    return data.rows;
  } catch (error: any) {
    console.error('Database Error:', error);
    throw new Error(`Failed to fetch jobs: ${(error as Error).message}`);
  }
}

export async function fetchJobsNotifications() {
  noStore();
  const session: Session | null = await getServerSession();
  const currentUserId = await getCurrentUserId(session);

  try {
    const data = await sql<JobsNotifications>`
    SELECT
      jobs.job_id,
      jobs.project_id,
      jobs.job_name,
      jobs.status,
      jobs.deadline,
      projects.project_name,
      jobsnotifications.type,
      jobsnotifications.is_read,
      jobsnotifications.created_at,
      jobsnotifications.user_id_to
    FROM jobs
    JOIN projects ON jobs.project_id = projects.project_id
    JOIN jobsnotifications ON jobs.job_id = jobsnotifications.job_id
    WHERE jobsnotifications.user_id_to = ${currentUserId}
    ORDER BY jobsnotifications.created_at DESC
    `;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch jobs.');
  }
}

export async function areJobsNotificationsRead() {
  noStore();
  const session: Session | null = await getServerSession();
  const currentUserId = await getCurrentUserId(session);

  try {
    const queryResult = await sql`
      SELECT is_read FROM jobsnotifications 
      WHERE user_id_to = ${currentUserId}
    `;
    const isReadValues = queryResult.rows.map(row => row.is_read);

    const allRead = isReadValues.every(isRead => isRead);

    return allRead;

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch jobs.');
  }
}