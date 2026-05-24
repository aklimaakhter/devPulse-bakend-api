import { issuesService } from "./issues.service";
// import { toQueryString } from "../../utils/query";
import sendResponse from "../../utils/sendResponse";
import { toQueryString } from "../../utils/query";
const createIssues = async (req, res) => {
    try {
        const user = req.user;
        const result = await issuesService.issueCreateIntoDB(req.body, user.id);
        return sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "Issue created successfully.",
            data: result
        });
    }
    catch (error) {
        return sendResponse(res, {
            statusCode: 500,
            success: false,
            message: error.message,
            error: error
        });
    }
};
const getAllIssues = async (req, res) => {
    try {
        const result = await issuesService.getAllIssueIntoDB({
            sort: toQueryString(req.query.sort),
            type: toQueryString(req.query.type),
            status: toQueryString(req.query.status)
        });
        return sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Issues retrieved successfully.",
            data: result
        });
    }
    catch (error) {
        return sendResponse(res, {
            statusCode: 500,
            success: false,
            message: error.message,
            error: error
        });
    }
};
const getSingleIssues = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await issuesService.getSingleIssueIntoDB(id);
        if (!result) {
            return sendResponse(res, {
                statusCode: 404,
                success: false,
                message: "Issue not found.",
                data: {}
            });
        }
        return sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Issue retrieved successfully.",
            data: result
        });
    }
    catch (error) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: error.message,
            error: error
        });
    }
};
const updatedIssues = async (req, res) => {
    try {
        const user = req.user;
        console.log(user);
        const id = req.params.id;
        const result = await issuesService.updateIssueIntoDB(id, req.body, user);
        if (!result) {
            return sendResponse(res, {
                statusCode: 404,
                success: false,
                message: "Issue not found.",
            });
        }
        return sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Issue updated successfully.",
            data: result
        });
    }
    catch (error) {
        return sendResponse(res, {
            statusCode: 500,
            success: false,
            message: error.message,
            error: error
        });
    }
};
const deleteIssue = async (req, res) => {
    try {
        const user = req.user;
        const id = req.params.id;
        const result = await issuesService.deleteIssueFromDB(id, user);
        if (!result) {
            return sendResponse(res, {
                statusCode: 404,
                success: false,
                message: "Issue not found.",
            });
        }
        return sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Issue deleted successfully.",
        });
    }
    catch (error) {
        return sendResponse(res, {
            statusCode: 500,
            success: false,
            message: error.message,
            error: error
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
//# sourceMappingURL=issues.controller.js.map