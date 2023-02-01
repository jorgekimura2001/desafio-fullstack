export interface IContactCreate {
    full_name: string;
    email: string;
    telephone: string;
}

export interface IContactUpdate {
    full_name?: string;
    email?: string;
    telephone?: string;
}