import { Request, Response } from "express";
import createContactService from "../services/contacts/createContact.service";
import deleteContactService from "../services/contacts/deleteContact.service";
import listContactsService from "../services/contacts/listContacts.service";
import listRetrieveContactService from "../services/contacts/listRetrieveContact.service";
import updateContactService from "../services/contacts/updateContact.service";

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

export const listRetrieveContactController = async (req: Request, res: Response) => {
    const {id} = req.params
    const idUser = req.user.id

    const contact = await listRetrieveContactService(id, idUser)
    return res.json(contact)
}

export const updateContactController = async (req: Request, res: Response) => {

    const {id} = req.params
    const idUser = req.user.id
    const data = req.body
    
    const contact = await updateContactService(id, idUser, data)
    return res.json(contact)
    
}

export const deleteContactController = async(req: Request, res: Response) => {

    const {id} = req.params
    const idUser = req.user.id

    await deleteContactService(id, idUser)

    return res.status(204).json()
}