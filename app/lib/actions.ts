'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { QueryResult, QueryResultRow } from '@vercel/postgres';
import { getServerSession, Session } from "next-auth";
import { getCurrentUserId } from "@/app/lib/data";

const FormSchema = z.object({
  id: z.string(),
  projectName: z.string({
    invalid_type_error: 'Please enter a name for the project.',
  }),
  memberIds: z.array(z.string({
    invalid_type_error: 'Please select a member.',
  })),
  startDate: z.string({
    invalid_type_error: 'Please select a start date.',
  }),
  endDate: z.string({
    invalid_type_error: 'Please select an end date.',
  }),
  category: z.string({
    invalid_type_error: 'Please select a category.',
  }),
  description: z.string({
    invalid_type_error: 'Please enter a description.',
  }),
});
 
const CreateProject = FormSchema.omit({ id: true, date: true });

export type State = {
  errors: {
    projectName?: string[] | undefined;
    memberId?: string[] | undefined;
    startDate?: string[] | undefined;
    endDate?: string[] | undefined;
    category?: string[] | undefined;
    description?: string[] | undefined;
  };
  message: string;
};
 
export async function createProject(prevState: State, formData: FormData) {
  const validatedFields = CreateProject.safeParse({
    projectName: formData.get('projectName'),
    memberIds: formData.getAll('memberIds'),
    startDate: formData.get('startDate'),
    endDate: formData.get('endDate'),
    category: formData.get('category'),
    description: formData.get('description'),
  });

  const session: Session | null = await getServerSession();
  const currentUserId = await getCurrentUserId(session);
 
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Project.',
    };
  }
 
  const { projectName, memberIds, startDate, endDate, category, description } = validatedFields.data;
  const start = new Date(startDate).toISOString().split('T')[0];
  const end = new Date(endDate).toISOString().split('T')[0];
 
  try {
    const result: QueryResult<QueryResultRow> = await sql`
    INSERT INTO projects (project_name, creator_id, start_date, end_date, category, description)
    VALUES (${projectName}, ${currentUserId}, ${start}, ${end}, ${category}, ${description})
    RETURNING project_id;
  `;
  
  const projectId = result.rows[0].project_id;

  await sql`
      INSERT INTO projectsmembers (user_id, project_id) VALUES (${currentUserId}, ${projectId});
    `;
  
  for (const memberId of memberIds) {
      await sql`
        INSERT INTO projectsmembers (user_id, project_id)
        VALUES (${memberId}, ${projectId});
      `;
    }
    
  await sql`
      INSERT INTO projectsadmins (user_id, project_id) VALUES (${currentUserId}, ${projectId});
    `;

  } catch (error) {
    return {
      ...prevState,
    message: 'Project created successfully.',
    errors: {},
    };
  }
 
  revalidatePath('/dashboard/');
  redirect('/dashboard/');
}

const UpdateProject = FormSchema.omit({ id: true, date: true });

export async function updateProject(id: string, formData: FormData) {
  const { projectName, memberIds, startDate, endDate, category, description } = UpdateProject.parse({
    projectName: formData.get('projectName'),
    memberIds: formData.getAll('memberIds') || [],
    startDate: formData.get('startDate'),
    endDate: formData.get('endDate'),
    category: formData.get('category'),
    description: formData.get('description'),
  });

  const session: Session | null = await getServerSession();
  const currentUserId = await getCurrentUserId(session);
 
  try {
    await sql`
        UPDATE projects
        SET project_name = ${projectName}, start_date = ${startDate}, end_date = ${endDate}, category = ${category}, description = ${description} 
        WHERE project_id = ${id}
      `;
    
    await sql`
        DELETE FROM projectsmembers
        WHERE project_id = ${id}
        AND user_id != ${currentUserId}
      `;
    
    for (const memberId of memberIds) {
      await sql`
        INSERT INTO projectsmembers (user_id, project_id)
        VALUES (${memberId}, ${id});
      `;
    }
  } catch (error) {
    return { message: 'Database Error: Failed to Update Project.' };
  }
 
  revalidatePath('/dashboard/');
  redirect('/dashboard/');
}

export async function deleteProject(id: string) {
  try {
    await sql`DELETE FROM projectsadmins WHERE project_id = ${id}`;
    await sql`DELETE FROM projectsmembers WHERE project_id = ${id}`;
    await sql`DELETE FROM projects WHERE project_id = ${id}`;
    revalidatePath('/dashboard/');
    return { message: 'Deleted Project.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Project.' };
  }
}