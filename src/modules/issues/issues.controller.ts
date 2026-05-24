
import type { Request, Response } from "express";
import { issuesService } from "./issues.service";
import { toQueryString } from "../../utils/query";


const createIssues = async (req: Request, res: Response) => {
    try {

        const user = (req as any).user;

        const result = await issuesService.issueCreateIntoDB(
            req.body,
            user.id
        );

        return res.status(201).json({
            success: true,
            message: "Issue created successfully",
            data: result
        });

    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getAllIssues = async (req: Request, res: Response) => {
    try {
        const result = await issuesService.getAllIssueIntoDB({
            sort: toQueryString(req.query.sort),
            type: toQueryString(req.query.type),
            status: toQueryString(req.query.status)
        });

        return res.status(200).json({
            success: true,
            message: "Issues retrieved successfully",
            data: result
        });

    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getSingleIssues = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {

        const result = await issuesService.getSingleIssueIntoDB(id as string);

        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Issue not found",
                data: {}
            });
        }

        return res.status(200).json({
            success: true,
            message: "Issue retrieved successfully",
            data: result
        });

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const updatedIssues = async (req: Request, res: Response) => {
    try {

        const user = (req as any).user;
        const id = req.params.id;

        const result = await issuesService.updateIssueIntoDB(
            id,
            req.body,
            user
        );

        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Issue not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Issue updated successfully",
            data: result
        });

    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const deleteIssue = async (req: Request, res: Response) => {
    try {

        const user = (req as any).user;
        const id = req.params.id;

        const result = await issuesService.deleteIssueFromDB(id as string, user);

        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Issue not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Issue deleted successfully"
        });

    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const issuesController = {
    createIssues,
    getAllIssues,
    getSingleIssues,
    updatedIssues,
    deleteIssue
};