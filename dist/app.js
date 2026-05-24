import express, {} from "express";
import config from "./config";
import { authRouter } from "./modules/auth/auth.router";
import { issuesRouter } from "./modules/issues/issues.router";
import cors from "cors";
const app = express();
const port = config.port;
app.use(express.json());
app.use(cors({
    origin: 'http://loclhost:5000',
}));
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hello World!',
        author: 'Next Level'
    });
});
app.use('/api/auth', authRouter);
app.use('/api/issues', issuesRouter);
export default app;
//# sourceMappingURL=app.js.map