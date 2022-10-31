export interface IUser {
    _id: string;
    name: string;
    email: string;
    password?: string;
    role: string;
    updatedAt?: string;
    createdAt?: string;
}