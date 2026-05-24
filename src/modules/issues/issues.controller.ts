
import type { Request, Response } from "express";
import { issuesService } from "./issues.service";


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

        const { sort, type, status } = req.query;

        const result = await issuesService.getAllIssueIntoDB({
            sort: sort as string,
            type: type as string,
            status: status as string
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
    const { id } = req.params;
    
    const user = (req as any).user;
    try {
        const result = await issuesService.updateIssueIntoDB(req.body, id as string, user)

        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "Issue not found",
                data: {}
            })

        }

        res.status(200).json({
            success: true,
            message: "Issues update successfully",
            data: result.rows[0]
        })

    } catch (error: any) {
        res.status(500).json({
            message: error.message,
            error: error

        })
    }
}

const deleteIssue = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await issuesService.deleteUserIntoDB(id as string)

        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "Issue not found",
                data: {}
            })

        }

        res.status(200).json({
            success: true,
            message: "Issue deleted successfully"
            
        })


    } catch (error: any) {
        res.status(500).json({
            message: error.message,
            error: error

        })
    }
}
export const issuesController = {
    createIssues,
    getAllIssues,
    getSingleIssues,
    updatedIssues,
    deleteIssue
};