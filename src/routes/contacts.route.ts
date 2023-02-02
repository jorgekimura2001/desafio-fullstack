import { Router } from "express";
import { createContactController, deleteContactController, listContactsController, listRetrieveContactController, updateContactController } from "../controllers/contacts.controller";

import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";

const routes = Router();

const contactRoutes = () => {
    
    routes.post('/', ensureAuthMiddleware, createContactController)
    routes.get('/', ensureAuthMiddleware, listContactsController)
    routes.get('/:id', ensureAuthMiddleware, listRetrieveContactController)
    routes.patch('/:id', ensureAuthMiddleware, updateContactController)
    routes.delete('/:id', ensureAuthMiddleware, deleteContactController)

    return routes
}

export default contactRoutes