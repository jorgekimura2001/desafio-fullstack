import { Router } from "express";
import { createContactController, listContactsController } from "../controllers/contacts.controller";

import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureUserMiddleware from "../middlewares/ensureUser.middleware";

const routes = Router();

const contactRoutes = () => {
    
    routes.post('/', ensureAuthMiddleware, createContactController)
    routes.get('/', ensureAuthMiddleware, listContactsController)
    // routes.get('/:id', ensureAuthMiddleware, ensureUserMiddleware )
    // routes.patch('/:id', ensureAuthMiddleware, ensureUserMiddleware )
    // routes.delete('/:id', ensureAuthMiddleware, ensureUserMiddleware)

    return routes
}

export default contactRoutes