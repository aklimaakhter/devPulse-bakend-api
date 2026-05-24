import { pool } from "../../db";
import type { IJwtUser } from "../auth/auth.interface";
import type { IIssue } from "./issue.interface";


const issueCreateIntoDB = async (
    payload: {
        title: string;
        description: string;
        type: "bug" | "feature_request";
    },
    userId: number
) => {

    const { title, description, type } = payload;

    const result = await pool.query(`
        INSERT INTO issues (
            title,
            description,
            type,
            reporter_id
        )
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `, [title, description, type, userId]);

    return result.rows[0];
};

const getAllIssueIntoDB = async (payload:any) => {
    const {sort, type, status}=payload;

    const issues = await pool.query(`
        SELECT * FROM issues ORDER BY created_at DESC
    `);

    const formatted = [];

    for (const issue of issues.rows) {

        const user = await pool.query(`
            SELECT id, name, role
            FROM users
            WHERE id = $1
        `, [issue.reporter_id]);

        formatted.push({
            id: issue.id,
            title: issue.title,
            description: issue.description,
            type: issue.type,
            status: issue.status,
            reporter: user.rows[0],
            created_at: issue.created_at,
            updated_at: issue.updated_at
        });
    }

    return formatted;
};

const getSingleIssueIntoDB = async (id: string) => {

    const issueResult = await pool.query(`
        SELECT *
        FROM issues
        WHERE id = $1
    `, [id]);

    if (issueResult.rows.length === 0) {
        throw new Error("Issue not found");
    }

    const issue = issueResult.rows[0];

    const userResult = await pool.query(`
        SELECT id, name, role
        FROM users
        WHERE id = $1
    `, [issue.reporter_id]);

    const reporter = userResult.rows[0];

    const formatted = {
        id: issue.id,
        title: issue.title,
        description: issue.description,
        type: issue.type,
        status: issue.status,
        reporter: reporter,
        created_at: issue.created_at,
        updated_at: issue.updated_at
    };

    return formatted;
};

const updateIssueIntoDB = async (
    id: string,
    payload: any,
    user: any
) => {


    const issueResult = await pool.query(
        `SELECT * FROM issues WHERE id = $1`,
        [id]
    );

    const issue = issueResult.rows[0];
    

    if (!issue) return null;


    const isMaintainer = user.role === "maintainer";
    const isOwner = issue.reporter_id === user.id;

    if (!isMaintainer && !isOwner) {
        throw new Error("Forbidden");
    }

    console.log(issue.reporter_id);
    console.log(user.id);


    if (!isMaintainer && issue.status !== "open") {
        throw new Error("You can only update open issues");
    }

    const { title, description, type } = payload;


    const result = await pool.query(
        `
        UPDATE issues 
        SET 
            title = COALESCE($1, title),
            description = COALESCE($2, description),
            type = COALESCE($3, type),
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $4
        RETURNING *
        `,
        [title, description, type, id]
    );

    return result.rows[0];
};

const deleteIssueFromDB = async (id: string, user: any) => {


    if (user.role !== "maintainer") {
        const error = new Error("Forbidden");
        (error as any).statusCode = 403;
        throw error;
    }


    const issueResult = await pool.query(
        `SELECT * FROM issues WHERE id = $1`,
        [id]
    );

    if (issueResult.rows.length === 0) {
        return null;
    }


    await pool.query(
        `DELETE FROM issues WHERE id = $1`,
        [id]
    );

    return true;
};


export const issuesService = {
    issueCreateIntoDB,
    getAllIssueIntoDB,
    getSingleIssueIntoDB,
    updateIssueIntoDB,
    deleteIssueFromDB

};