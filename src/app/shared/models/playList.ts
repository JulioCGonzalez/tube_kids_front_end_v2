import { Avatar } from "./avatar";
import { Video } from "./video";

export interface PlayList{
    id?:number;
    name?: string;
    videos?:Video[];
    avatars?: Avatar[];
}