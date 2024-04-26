'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { QueryResult, QueryResultRow } from '@vercel/postgres';
import { getServerSession, Session } from "next-auth";
import { getCurrentUserId } from "@/app/lib/data";
import { compare, hash } from 'bcrypt';

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
  })
});
 
const CreateProject = FormSchema.omit({ id: true });

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
  try {
    const result: QueryResult<QueryResultRow> = await sql`
    INSERT INTO projects (project_name, creator_id, start_date, end_date, category, description)
    VALUES (${projectName}, ${currentUserId}, ${startDate}, ${endDate}, ${category}, ${description})
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
 
  revalidatePath('/dashboard');
  redirect('/dashboard');
}

const UpdateProject = FormSchema.omit({ id: true, memberIds: true });

export async function updateProject(id: string, formData: FormData) {
  const { projectName, startDate, endDate, category, description } = UpdateProject.parse({
    projectName: formData.get('projectName'),
    startDate: formData.get('startDate'),
    endDate: formData.get('endDate'),
    category: formData.get('category'),
    description: formData.get('description'),
  });
 
  try {
    await sql`
        UPDATE projects
        SET project_name = ${projectName}, start_date = ${startDate}, end_date = ${endDate}, category = ${category}, description = ${description} 
        WHERE project_id = ${id}
      `;

  } catch (error) {
    return { message: 'Database Error: Failed to Update Project.' };
  }
 
  revalidatePath(`/dashboard/${id}/edit`);
  redirect(`/dashboard/${id}/edit`);
}

export async function deleteProject(id: string) {
  const result: QueryResult<QueryResultRow> = await sql`SELECT job_id FROM jobs WHERE project_id = ${id}`;
  const jobIds: string[] = result.rows.map((row) => row.job_id);

  try {
    for (const jobId of jobIds) {
      await sql`DELETE FROM jobsmembers WHERE job_id = ${jobId}`;
      await sql`DELETE FROM jobs WHERE job_id = ${jobId}`;
    }
    await sql`DELETE FROM projectsadmins WHERE project_id = ${id}`;
    await sql`DELETE FROM projectsmembers WHERE project_id = ${id}`;
    await sql`DELETE FROM projects WHERE project_id = ${id}`;
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Project.' };
  }

  revalidatePath('/dashboard');
  redirect('/dashboard');
}

const JobFormSchema = z.object({
  jobId: z.string(),
  projectId: z.string({
    invalid_type_error: 'No project found',
  }),
  jobName: z.string({
    invalid_type_error: 'Please enter a name for the job.',
  }),
  jobMemberIds: z.array(z.string({
    invalid_type_error: 'Please select a member.',
  })),
  status: z.enum(['Chưa làm', 'Đang làm', 'Đã làm'], {
    invalid_type_error: 'Please select a job status.',
  }),
  deadline: z.string({
    invalid_type_error: 'Please select a deadline.',
  }),
  jobDescription: z.string({
    invalid_type_error: 'Please enter a description.',
  }),
  resultUrl: z.string({
    invalid_type_error: 'Please enter a result url.',
  }),
});

const CreateJob = JobFormSchema.omit({ jobId: true });

export type JobState = {
  errors: {
    projectId?: string[] | undefined;
    jobName?: string[] | undefined;
    jobMemberId?: string[] | undefined;
    status?: string[] | undefined;
    deadline?: string[] | undefined;
    jobDescription?: string[] | undefined;
    resultUrl?: string[] | undefined;
  };
  message: string;
};
 
export async function createJob(prevState: JobState, formData: FormData) {
  const validatedFields = CreateJob.safeParse({
    projectId: formData.get('projectId'),
    jobName: formData.get('jobName'),
    jobMemberIds: formData.getAll('jobMemberIds'),
    status: formData.get('status'),
    deadline: formData.get('deadline'),
    jobDescription: formData.get('jobDescription'),
    resultUrl: formData.get('resultUrl'),
  });

  const session: Session | null = await getServerSession();
  const currentUserId = await getCurrentUserId(session);
 
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Job.',
    };
  }
 
  const { projectId, jobName, jobMemberIds, status, deadline, jobDescription, resultUrl } = validatedFields.data;
  try {
    const result: QueryResult<QueryResultRow> = await sql`
    INSERT INTO jobs (project_id, job_name, creator_id, status, deadline, description, result_url)
    VALUES (${projectId}, ${jobName}, ${currentUserId}, ${status}, ${deadline}, ${jobDescription}, ${resultUrl})
    RETURNING job_id;
  `;
  
  const jobId = result.rows[0].job_id;
  
  for (const jobMemberId of jobMemberIds) {
      await sql`
        INSERT INTO jobsmembers (user_id, job_id)
        VALUES (${jobMemberId}, ${jobId});
      `;
    }

  } catch (error) {
    return {
      ...prevState,
    message: 'Job created successfully.',
    errors: {},
    };
  }
 
  revalidatePath(`/dashboard/${projectId}/edit`);
  redirect(`/dashboard/${projectId}/edit`);
}

const UpdateJob = JobFormSchema.omit({ jobId: true, projectId: true, jobMemberIds: true });

export async function updateJob(id: string, formData: FormData) {
  const { jobName, status, deadline, jobDescription, resultUrl } = UpdateJob.parse({
    jobName: formData.get('jobName'),
    status: formData.get('status'),
    deadline: formData.get('deadline'),
    jobDescription: formData.get('jobDescription'),
    resultUrl: formData.get('resultUrl'),
  });
 
  try {
    await sql`
        UPDATE jobs
        SET job_name = ${jobName}, status = ${status}, deadline = ${deadline}, result_url = ${resultUrl}, description = ${jobDescription} 
        WHERE job_id = ${id}
      `;

  } catch (error) {
    return { message: 'Database Error: Failed to Update Job.' };
  }
 
  revalidatePath(`/dashboard/jobs/${id}/edit`);
  redirect(`/dashboard/jobs/${id}/edit`);
}

export async function deleteJob(id: string, project_id: string) {
  try {
    await sql`DELETE FROM jobsmembers WHERE job_id = ${id}`;
    await sql`DELETE FROM jobs WHERE job_id = ${id}`;
    revalidatePath(`/dashboard/${project_id}/edit`);
    return { message: 'Deleted Job.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Job.' };
  }
}

export async function updateUser(id: string, formData: FormData) {
  const user_name = formData.get('user_name') as string;
  const date_of_birth = formData.get('date_of_birth') as string;
  const phone = formData.get('phone') as string;

  try {
    await sql`
      UPDATE accounts
      SET
        user_name = ${user_name},
        date_of_birth = ${date_of_birth},
        phone = ${phone}
      WHERE user_id = ${id}
    `;

    revalidatePath(`/dashboard/account`);
    redirect(`/dashboard/account`);
  } catch (error) {
    return { message: 'Đổi thông tin thành công.' };
  }
}

export async function updatePassword(id: string, formData: FormData) {
  const oldpassword = formData.get('oldpassword') as string;
  const newpassword = formData.get('newpassword') as string;
  const newpassword2 = formData.get('newpassword2') as string;

  if (newpassword !== newpassword2) {
    return { message: 'Mật khẩu mới nhập lại không khớp.' };
  }
  try {
    const result = await sql`
      SELECT password
      FROM accounts
      WHERE user_id = ${id}
    `;
    if (result.rowCount === 0) {
      return { message: 'Không tìm thấy người dùng' };
    }
    const hashedPassword = result.rows[0].password;
    const passwordMatch = await compare(oldpassword, hashedPassword);
    if (!passwordMatch) {
      return { message: 'Mật khẩu cũ sai.' };
    }
    const hashedNewPassword = await hash(newpassword, 10);
    await sql`
      UPDATE accounts
      SET password = ${hashedNewPassword}
      WHERE user_id = ${id}
    `;
    revalidatePath(`/dashboard/account`);
    redirect(`/dashboard/account`);
  } catch (error) {
    return { message: 'Đổi mật khẩu thành công.' };
  }
}

export async function addCategory(id: string, formData: FormData) {
  const category = formData.get('category') as string;
  try {
    await sql`
      INSERT INTO categories VALUES (${id}, ${category});
    `;

    revalidatePath(`/dashboard/account`);
    redirect(`/dashboard/account`);
  } catch (error) {
    return { message: 'Database Error: Failed to Add Category.' };
  }
}

export async function deleteCategory(id: string, formData: FormData) {
  const category = formData.get('category') as string;
  try {
    await sql`DELETE FROM categories WHERE category = ${category} AND user_id = ${id}`;

    revalidatePath(`/dashboard/account`);
    redirect(`/dashboard/account`);
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Category.' };
  }
}

export async function updateProfile() {
  try {
    const session = await getServerSession();
    const currentUserId = await getCurrentUserId(session);

    await sql`
      UPDATE accounts
      SET
        profile_url = ${'/users/' + currentUserId + '.png'}
      WHERE user_id = ${currentUserId}
    `;
    revalidatePath(`/dashboard/account`);
    redirect(`/dashboard/account`);
  } catch (error) {
    console.error('Error updating profile:', error);
    return { message: 'Đổi thông tin không thành công.' };
  }
}

export async function addMember(id: string, formData: FormData) {
  const memberEmail = formData.get('memberEmail') as string;
  try {
    const result: QueryResult = await sql`
      SELECT user_id FROM accounts WHERE email = ${memberEmail};
    `;
    
    const userId = result.rows[0].user_id;

    await sql`
      INSERT INTO projectsmembers (project_id, user_id) VALUES (${id}, ${userId});
    `;

    revalidatePath(`/dashboard/${id}/edit`);
    redirect(`/dashboard/${id}/edit`);
  } catch (error) {
    return { message: 'Database Error: Failed to Add Member.' };
  }
}

export async function deleteMember(id: string, formData: FormData) {
  const memberId = formData.get('memberId') as string;
  const session = await getServerSession();
  const currentUserId = await getCurrentUserId(session);
  try {
    if (memberId !== currentUserId) {
      await sql`DELETE FROM projectsmembers WHERE user_id = ${memberId} AND project_id = ${id}`;
    } else {
      return { message: 'You cannot delete yourself from the project.' };
    }

    revalidatePath(`/dashboard/${id}/edit`);
    redirect(`/dashboard/${id}/edit`);
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Member.' };
  }
}

export async function addAdmin(id: string, formData: FormData) {
  const adminEmail = formData.get('adminEmail') as string;
  try {
    const result: QueryResult = await sql`
      SELECT user_id FROM accounts WHERE email = ${adminEmail};
    `;
    
    const userId = result.rows[0].user_id;

    await sql`
      INSERT INTO projectsadmins (project_id, user_id) VALUES (${id}, ${userId});
    `;

    revalidatePath(`/dashboard/${id}/edit`);
    redirect(`/dashboard/${id}/edit`);
  } catch (error) {
    return { message: 'Database Error: Failed to Add Admin.' };
  }
}

export async function deleteAdmin(id: string, formData: FormData) {
  const adminId = formData.get('adminId') as string;
  const session = await getServerSession();
  const currentUserId = await getCurrentUserId(session);
  try {
    if (adminId !== currentUserId) {
      await sql`DELETE FROM projectsadmins WHERE user_id = ${adminId} AND project_id = ${id}`;
    } else {
      return { message: 'You cannot delete yourself from the project.' };
    }

    revalidatePath(`/dashboard/${id}/edit`);
    redirect(`/dashboard/${id}/edit`);
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Admin.' };
  }
}

export async function addJobsMember(id: string, formData: FormData) {
  const memberEmail = formData.get('memberEmail') as string;
  const projectId = formData.get('projectId') as string;
  try {
    const result: QueryResult = await sql`
    SELECT user_id FROM accounts WHERE email = ${memberEmail};
    `;

    if (result.rowCount === 0) {
      return { message: 'User does not exist.' };
    } else {
        const userId = result.rows[0].user_id;
        const projectMemberResult: QueryResult = await sql`
          SELECT 1 FROM projectsmembers WHERE user_id = ${userId} AND project_id = ${projectId};
          `;
        if (projectMemberResult.rowCount === 0) {
          return { message: 'User is not a member of the project.' };
        } else {
            await sql`
              INSERT INTO jobsmembers (job_id, user_id) VALUES (${id}, ${userId});
              `;
        }
    }

    revalidatePath(`/dashboard/${id}/edit`);
    redirect(`/dashboard/${id}/edit`);
  } catch (error) {
    return { message: 'Database Error: Failed to Add Member.' };
  }
}

export async function deleteJobsMember(id: string, formData: FormData) {
  const memberId = formData.get('memberId') as string;
  const session = await getServerSession();
  const currentUserId = await getCurrentUserId(session);
  try {
    if (memberId !== currentUserId) {
      await sql`DELETE FROM jobsmembers WHERE user_id = ${memberId} AND job_id = ${id}`;
    } else {
      return { message: 'You cannot delete yourself from the job.' };
    }

    revalidatePath(`/dashboard/${id}/edit`);
    redirect(`/dashboard/${id}/edit`);
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Member.' };
  }
}

export async function updateResult(id: string, formData: FormData) {
  const result = formData.get('result') as string;
  try {
    await sql`
      UPDATE jobs
      SET
        result_url = ${result}
      WHERE job_id = ${id}
    `;
    revalidatePath(`/dashboard/jobs`);
    redirect(`/dashboard/jobs`);
  } catch (error) {
    console.error('Error updating:', error);
    return { message: 'Đổi thông tin không thành công.' };
  }
}