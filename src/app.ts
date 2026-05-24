import express, { type Application, type Request, type Response } from "express";
import config from "./config";
import { authRouter } from "./modules/auth/auth.router";
import { issuesRouter } from "./modules/issues/issues.router";
import cors from "cors";

const app: Application = express()
const port = config.port

app.use(express.json())
app.use(cors({
    origin: 'http://loclhost:3000',
}))


app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        message: 'Hello World!',
        author: 'Next Level'
    })
})

app.use('/api/auth',authRouter)
app.use('/api/issues',issuesRouter)

export default app;