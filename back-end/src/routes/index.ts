import { Express } from 'express'
import userRoutes from './userRoutes'

const appRoutes = (app: Express) => {
    app.use('/users', userRoutes())
} 

export default appRoutes