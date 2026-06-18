import type { IUser } from "./auth.interface";
export declare const authService: {
    createUserIntoDB: (payload: IUser) => Promise<import("pg").QueryResult<any>>;
    loginUserIntoDB: (payload: {
        email: string;
        password: string;
    }) => Promise<{
        token: string;
        user: {
            id: any;
            name: any;
            email: any;
            role: any;
            created_at: any;
            updated_at: any;
        };
    }>;
};
//# sourceMappingURL=auth.service.d.ts.map