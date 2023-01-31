import { Express } from 'express'
import sessionRoutes from './sessions.route'
import userRoutes from './users.route'

const appRoutes = (app: Express) => {
    app.use('/users', userRoutes())
    app.use('/login', sessionRoutes())
} 

export default appRoutes