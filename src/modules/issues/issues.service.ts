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

const getAllIssueIntoDB = async (filters: {
    sort?: string;
    type?: string;
    status?: string;
}) => {

    const { sort, type, status } = filters;

    let query = `SELECT * FROM issues WHERE 1=1`;
    const values: any[] = [];

    
    if (type) {
        values.push(type);
        query += ` AND type = $${values.length}`;
    }

    
    if (status) {
        values.push(status);
        query += ` AND status = $${values.length}`;
    }

    
    if (sort === "oldest") {
        query += ` ORDER BY created_at ASC`;
    } else {
        query += ` ORDER BY created_at DESC`;
    }

    const result = await pool.query(query, values);

    return result.rows;
};

const getSingleIssueIntoDB = async (id: string) => {

    const result = await pool.query(`
            SELECT * FROM issues WHERE id=$1
            `, [id]);
    return result.rows[0];
}

const updateIssueIntoDB = async (
    payload: IIssue,
    id: string,
    user: IJwtUser) => {
    // const { title, description, type } = payload;

    const issueRes = await pool.query(
        `SELECT * FROM issues WHERE id=$1`,
        [id]
    );
    const issue = issueRes.rows[0];

    if (!issue) {
        throw new Error("Issue not found");
    }

    if (
        user.role !== "maintainer" &&
        issue.reporter_id !== user.id
    ) {
        throw new Error("Forbidden");
    }

    const { title, description, type, status } = payload;


    const result = await pool.query(`
        UPDATE issues SET 
        title=COALESCE($1, title), 
        description=COALESCE($2, description), 
        
        type=COALESCE($3, type)
        WHERE id = $4 RETURNING *
        `, [title, description, type, id]);
    return result.rows[0];
}

const deleteUserIntoDB = async (id: string) => {
    const result = await pool.query(`
        DELETE FROM issues WHERE id=$1
        RETURNING *
        `, [id]);
    return result;
}
export const issuesService = {
    issueCreateIntoDB,
    getAllIssueIntoDB,
    getSingleIssueIntoDB,
    updateIssueIntoDB,
    deleteUserIntoDB

};