import { Express } from 'express'
import contactRoutes from './contacts.route'
import sessionRoutes from './sessions.route'
import userRoutes from './users.route'

const appRoutes = (app: Express) => {
    app.use('/users', userRoutes())
    app.use('/login', sessionRoutes())
    app.use('/contacts', contactRoutes())
} 

export default appRoutes