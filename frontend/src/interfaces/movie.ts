import { Actor } from "./actor";
import  {Review} from "./review"


export interface Movie {
    id?: string | undefined;
    title: string | undefined;
    year: string | undefined;
    cost:number | undefined;
    imageURL?: string | undefined;
    actorIds?: string[] | undefined;
}

export interface MovieDetails {
    id?: string;
    title: string;
    year: string;
    cost: number;
    imageURL?: string;
    actorIds?: string[];
    actors?: Actor[];
    reviews?: Review[];
}