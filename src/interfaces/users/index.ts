export interface IUser {
    id: string;
    full_name: string;
    email: string;
    telephone: string;
    created_at: Date;
    updated_at: Date;
    password: string
}

export interface IUserCreate {
    full_name: string;
    email: string;
    telephone: string;
    password: string;
}

export interface IUserUpdate {
    full_name?: string;
    email?: string;
    password?: string;
    telephone?: string;
}