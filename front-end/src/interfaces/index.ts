import { Dispatch, ReactNode, SetStateAction } from "react";

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
    login: (data: ILogin) => Promise<void>;
    user: IUser;
    loading: boolean;
    logout: () => void;
    handleToProfilePage: () => void;
    setLoading: Dispatch<SetStateAction<boolean>>;
    updateUser: ({ id, data }: IUserUp) => Promise<void>;
    removeUser: (id: string) => Promise<void>;
}

export interface IContact{
    id: string;
    full_name: string;
	email: string;
	telephone: string;
	created_at: string;
    updated_at: string;
}

export interface IUser{
    full_name: string;
	email: string;
	telephone: string;
	id: string;
	created_at: string;
	updated_at: string;
}

export interface IContactData{
    contacts: IContact[];
    setContacts: Dispatch<SetStateAction<IContact[]>>;
    addContact: (data: IContactCreate) => Promise<void>;
    loading: boolean;
    updateContact: ({ id, data }: IContactUp) => Promise<void>;
    removeContact: (id: string) => Promise<void>;
}

export interface IModalAddProps{
    setModalAddContact: Dispatch<SetStateAction<boolean>>
}

export interface IContactCreate{
    full_name: string;
	email: string;
	telephone: string;
}

export interface IContactCardProps{
    full_name: string;
	email: string;
	telephone: string;
    id_contact: string;
}

export interface IModalEditProps{
    full_name: string;
	email: string;
	telephone: string;
    id_contact: string;
    setModalEdit: Dispatch<SetStateAction<boolean>>;
  }

export interface IContactUp{
    id: string;
    data: IContactCreate
} 

export interface IHeaderProps{
    onClick: () => void;
    button: ReactNode
}

export interface IUserUp{
    id: string;
    data: IRegistration
} 