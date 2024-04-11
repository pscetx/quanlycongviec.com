export type Accounts = {
    user_id: string;
    user_name: string;
    email: string;
    password: string;
    date_of_birth: string;
    phone: string;
    profile_url: string;
};

export type Categories = {
    user_id: string;
    category: string;
};

export type Projects = {
    project_id: string;
    project_name: string;
    creator_id: string;
    start_date: string;
    end_date: string;
    category: string;
    description: string;
};

export type ProjectsAdmins = {
    user_id: string;
    project_id: string;
};

export type ProjectsMembers = {
    user_id: string;
    project_id: string;
};

export type Jobs = {
    job_id: string;
    project_id: string;
    job_name: string;
    creator_id: string;
    description: string;
    status: 'Chưa làm' | 'Đang làm' | 'Đã làm';
    deadline: string;
    result_url: string;
};

export type JobsMembers = {
    user_id: string;
    job_id: string;
};

export type Reports = {
    report_id: string;
    project_id: string;
    report_name: string;
    creator_id: string;
    created_at: string;
};

export type ProjectsTable = {
    project_id: string;
    project_name: string;
    start_date: string;
    end_date: string;
    category: string;
    user_name: string;
};

export type MembersProfilesList = {
    project_id: string;
    profile_url: string;
};

export type MembersField = {
    user_id: string;
    user_name: string;
    profile_url: string;
};

export type ProjectForm = {
    project_id: string;
    project_name: string;
    start_date: string;
    end_date: string;
    category: string;
    user_name: string;
    description: string;
};

export type JobsTable = {
    job_id: string;
    project_id: string;
    job_name: string;
    creator_id: string;
    user_name: string;
    status: 'Chưa làm' | 'Đang làm' | 'Đã làm';
    deadline: string;
};

export type JobsMembersProfilesList = {
    job_id: string;
    profile_url: string;
};