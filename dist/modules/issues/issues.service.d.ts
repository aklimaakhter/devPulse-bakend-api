export declare const issuesService: {
    issueCreateIntoDB: (payload: {
        title: string;
        description: string;
        type: "bug" | "feature_request";
    }, userId: number) => Promise<any>;
    getAllIssueIntoDB: (payload: any) => Promise<{
        id: any;
        title: any;
        description: any;
        type: any;
        status: any;
        reporter: any;
        created_at: any;
        updated_at: any;
    }[]>;
    getSingleIssueIntoDB: (id: string) => Promise<{
        id: any;
        title: any;
        description: any;
        type: any;
        status: any;
        reporter: any;
        created_at: any;
        updated_at: any;
    }>;
    updateIssueIntoDB: (id: string, payload: any, user: any) => Promise<any>;
    deleteIssueFromDB: (id: string, user: any) => Promise<true | null>;
};
//# sourceMappingURL=issues.service.d.ts.map