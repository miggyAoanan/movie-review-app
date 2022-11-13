import { Actor } from "./actor";
import  {Review} from "./review"


export interface Movie {
    id?: string;
    title: string | undefined;
    overview?: string;
    yearReleased: number;
    cost:number | undefined;
    imageURL?: string;
    actorIds?: string[] | string;
}

export interface MovieDetails {
    id?: string;
    title: string;
    overview: string;
    yearReleased: number;
    cost: number;
    imageURL?: string;
    actorIds?: string[];
    actors?: Actor[];
    reviews?: Review[];
}