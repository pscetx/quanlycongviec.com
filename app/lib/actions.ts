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

const UpdateProject = FormSchema.omit({ id: true, date: true });

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

// export async function updateInvoice(id: string, formData: FormData) {
//   const { customerId, amount, status } = UpdateInvoice.parse({
//     customerId: formData.get('customerId'),
//     amount: formData.get('amount'),
//     status: formData.get('status'),
//   });
 
//   const amountInCents = amount * 100;
 
//   try {
//     await sql`
//         UPDATE invoices
//         SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
//         WHERE id = ${id}
//       `;
//   } catch (error) {
//     return { message: 'Database Error: Failed to Update Invoice.' };
//   }
 
//   revalidatePath('/dashboard/invoices');
//   redirect('/dashboard/invoices');
// }

// export async function deleteInvoice(id: string) {
//   try {
//     await sql`DELETE FROM invoices WHERE id = ${id}`;
//     revalidatePath('/dashboard/invoices');
//     return { message: 'Deleted Invoice.' };
//   } catch (error) {
//     return { message: 'Database Error: Failed to Delete Invoice.' };
//   }
// }