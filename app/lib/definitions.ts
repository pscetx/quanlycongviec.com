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
    description: string;
};

export type MembersProfilesList = {
    project_id: string;
    job_id: string;
    profile_url: string;
    email: string;
    user_name: string;
};

export type MembersField = {
    user_id: string;
    user_name: string;
    email: string;
    profile_url: string;
    job_count: string;
};

export type ProjectForm = {
    project_id: string;
    project_name: string;
    category: string;
    start_date: string;
    end_date: string;
    description: string;
    creator_id: string;
    user_name: string;
    email: string;
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

export type JobForm = {
    job_id: string;
    project_id: string;
    job_name: string;
    status: 'Chưa làm' | 'Đang làm' | 'Đã làm';
    deadline: string;
    description: string;
    result_url: string;
    creator_id: string;
    user_name: string;
    email: string;
};

export type JobPercentage = {
    project_id: string;
    project_name: string;
    status: 'Chưa làm' | 'Đang làm' | 'Đã làm';
    total_jobs: string;
    total_specified_jobs: string;
    percent_completed: string;
};

export type JobsNotifications = {
    job_id: string;
    type: string;
    user_id_to: string;
	is_read: boolean;
    created_at: string;
};