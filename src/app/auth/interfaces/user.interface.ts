import { Avatar } from "../../shared/models/avatar";
import { PlayList } from "../../shared/models/playList";

export interface User {
    id?:    number;
    user?:  string;
    email?: string;
    name?: string;
    last_name?: string;
    country?: string;
    avatars?: Avatar[];
    pin?: number;
    authorization?: Auth;
    play_lists?: PlayList[];
    sms_code?: string;
}

export interface Auth {
    token?: string;    
}

export interface LogIn {
    email: string; 
    password: string;     
}