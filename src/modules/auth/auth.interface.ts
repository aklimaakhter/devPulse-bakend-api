export interface IUser {
    name: string,
    email: string,
    password: string,
    role: string
}

export interface IJwtUser {
    id: number;
    name: string;
    role: "contributor" | "maintainer";
}