import { Actor } from "./actor";
import  {Review} from "./review"


export interface Movie {
    id?: string;
    title: string | undefined;
    overview?: string;
    year: string | undefined;
    cost:number | undefined;
    imageURL?: string;
    actorIds?: string[] | string;
}

export interface MovieDetails {
    id?: string;
    title: string;
    overview: string;
    year: string;
    cost: number;
    imageURL?: string;
    actorIds?: string[];
    actors?: Actor[];
    reviews?: Review[];
}