import { Router } from "express";
import { issuesController } from "./issues.controller";
import { auth } from "../../middleware/auth";
const router = Router();
router.post("/", auth(), issuesController.createIssues);
router.get("/", issuesController.getAllIssues);
router.get("/:id", issuesController.getSingleIssues);
router.patch("/:id", auth(), issuesController.updatedIssues);
router.delete("/:id", auth("maintainer"), issuesController.deleteIssue);
export const issuesRouter = router;
//# sourceMappingURL=issues.router.js.map