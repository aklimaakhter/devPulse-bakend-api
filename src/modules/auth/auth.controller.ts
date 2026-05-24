import type { Request, Response } from "express"
import { authService } from "./auth.service"
import sendResponse from "../../utils/sendResponse"


const createUser = async (req: Request, res: Response) => {

    try {
        const result = await authService.createUserIntoDB(req.body)
         sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "User registered successfully.",
            data: result.rows[0]

        })

    } catch (error: any) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: error.message,
            error: error
        })
    }
}

const loginUser = async (req: Request, res: Response) => {


    try {
        const result = await authService.loginUserIntoDB(req.body)
        // res.status(201).json({
        //     success: true,
        //     message: "Login successful",
        //     data: result
        // })
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Login successful.",
            data: result

        })

    } catch (error: any) {
        // res.status(500).json({
        //     success: false,
        //     message: error.message,
        //     error: error
        // })
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: error.message,
            error: error
        })
    }
}

export const authController = {
    createUser,
    loginUser
}