import { Router } from "express";

import {
  userCreateController,
  userListController,
} from "../controllers/users.controller";

const routes = Router();

const userRoutes = () => {
    
    routes.post('/', userCreateController)
    routes.get('/', userListController)

    return routes
}

export default userRoutes