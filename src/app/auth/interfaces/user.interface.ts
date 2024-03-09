export interface User {
    id?:    number;
    user?:  string;
    email?: string;
    name?: string;
    authorization?: Auth;
    
}

export interface Auth {
    token?: string;    
}

export interface LogIn {
    email: string; 
    password: string;     
}