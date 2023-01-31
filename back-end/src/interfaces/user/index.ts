export interface IUser {
    id: string;
    full_name: string;
    email: string;
    telephone: number;
    registration_date: Date;
}

export interface IUserCreate {
    full_name: string;
    email: string;
    telephone: number;
}