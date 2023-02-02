import { Router } from "express";
import loginSessionController from "../controllers/sessions.controller";

const routes = Router();

const sessionRoutes = () => {
    
    routes.post('/', loginSessionController)
  
    return routes
}

export default sessionRoutes