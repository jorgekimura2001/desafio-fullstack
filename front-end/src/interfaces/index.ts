import { ReactNode } from "react";

export interface IChildren {
    children: ReactNode;
}

export interface ILogin {
    email: string;
    password: string;
}

export interface IRegistration {
    email: string;
    password: string;
    full_name: string;
    telephone: string;
}

export interface IUserData{
    registration: (data: IRegistration) => Promise<void>;
    login: (data: ILogin) => Promise<void>
}