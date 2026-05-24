import jwt from "jsonwebtoken";
import { type NextFunction, type Request, type Response } from "express";
import config from "../config";


export const auth =
  (...requiredRoles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided"
      });
    }

    try {
      const decoded = jwt.verify(
        token,
        config.secret as string
      );

      (req as any).user = decoded;

      if (
        requiredRoles.length > 0 &&
        !requiredRoles.includes(
          (decoded as { role: string }).role
        )
      ) {
        return res.status(403).json({
          success:false,
          message:"Forbidden"
        });
      }

      next();

    } catch {
      return res.status(401).json({
        success:false,
        message:"Invalid token"
      });
    }
};
