export interface User {
    id?: string;
    fullName: string;
    email: string;
    isActive?: boolean,
    permissions?:string,
    password?: string;
}