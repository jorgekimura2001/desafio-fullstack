import { Router } from "express";

import {
  createUserController,
  listRetrieveUserController,
  listUsersController,
  updateUserController,
} from "../controllers/users.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureUserMiddleware from "../middlewares/ensureUser.middleware";

const routes = Router();

const userRoutes = () => {
    
    routes.post('/', createUserController)
    routes.get('/', listUsersController)
    routes.get('/:id', ensureAuthMiddleware, ensureUserMiddleware, listRetrieveUserController)
    routes.patch('/:id', ensureAuthMiddleware, ensureUserMiddleware, updateUserController)

    return routes
}

export default userRoutes