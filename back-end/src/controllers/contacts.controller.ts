import { Request, Response } from "express";
import createContactService from "../services/contacts/createContact.service";
import listContactsService from "../services/contacts/listContacts.service";

export const createContactController = async (req: Request, res: Response) => {
    const { full_name, email, telephone, } = req.body 
    const idUser = req.user.id
    const contact = await createContactService({full_name, email, telephone}, idUser)
    return res.status(201).json(contact)
}

export const listContactsController = async (req: Request, res: Response) => {
    const idUser = req.user.id

    const contacts = await listContactsService(idUser)

    return res.json(contacts)
}