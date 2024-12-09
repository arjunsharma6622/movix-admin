export interface UserType{
    _id?:string;
    username? : string;
    email? : string;
    profilePic? : string;
    password ?: string;
    isAdmin?:boolean;
}