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
    email: string;
    job_count: string;
};

export type ProjectForm = {
    project_id: string;
    project_name: string;
    start_date: string;
    end_date: string;
    category: string;
    creator_id: string;
    user_name: string;
    email: string;
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
    description: string;
    result_url: string;
};

export type JobsMembersProfilesList = {
    job_id: string;
    profile_url: string;
};

export type JobForm = {
    job_id: string;
    project_id: string;
    job_name: string;
    description: string;
    status: 'Chưa làm' | 'Đang làm' | 'Đã làm';
    deadline: string;
    result_url: string;
    user_name: string;
};

export type JobPercentage = {
    project_id: string;
    project_name: string;
    total_jobs: string;
    total_specified_jobs: string;
    status: 'Chưa làm' | 'Đang làm' | 'Đã làm';
    percent_completed: string;
};