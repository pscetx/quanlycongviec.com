export type Account = {
    user_id: string;
    name: string;
    email: string;
    password: string;
    date_of_birth: string;
    phone: string;
    profile_url: string;
};

export type Category = {
    user_id: string;
    category: string;
};

export type Project = {
    project_id: string;
    name: string;
    creator_id: string;
    start_date: string;
    end_date: string;
    category: string;
    description: string;
};

export type ProjectAdmin = {
    user_id: string;
    project_id: string;
};

export type ProjectMember = {
    user_id: string;
    project_id: string;
};

export type Job = {
    job_id: string;
    project_id: string;
    name: string;
    creator_id: string;
    description: string;
    status: 'Chưa làm' | 'Đang làm' | 'Đã làm';
    deadline: string;
    result_url: string;
};

export type JobMember = {
    user_id: string;
    job_id: string;
};

export type Report = {
    report_id: string;
    project_id: string;
    name: string;
    creator_id: string;
    created_at: string;
};