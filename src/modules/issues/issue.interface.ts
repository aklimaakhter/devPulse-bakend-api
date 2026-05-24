export interface IIssue{
    id:string,
    title:string,
    description:string,
    type:string ,
     status?: "open" | "in_progress" | "resolved";
}


