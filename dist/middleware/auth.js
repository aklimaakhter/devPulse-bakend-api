import jwt from "jsonwebtoken";
import {} from "express";
import config from "../config";
import sendResponse from "../utils/sendResponse";
import { error } from "node:console";
export const auth = (...requiredRoles) => (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return sendResponse(res, {
            statusCode: 401,
            success: false,
            message: "No token provided.",
            error: error
        });
    }
    try {
        const decoded = jwt.verify(token, config.secret);
        req.user = decoded;
        if (requiredRoles.length > 0 &&
            !requiredRoles.includes(decoded.role)) {
            return sendResponse(res, {
                statusCode: 403,
                success: false,
                message: "Forbidden.",
                error: error
            });
        }
        next();
    }
    catch {
        sendResponse(res, {
            statusCode: 401,
            success: false,
            message: "Invalid token.",
            error: error
        });
    }
};
//# sourceMappingURL=auth.js.map