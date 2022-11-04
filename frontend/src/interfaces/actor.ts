import { Movie } from "./movie";

export interface Actor {
    id?: string;
    firstName: string | undefined;
    lastName: string ;
    gender: string;
    age: number;
    imageURL?: string;
    
}

export interface ActorDetails {
    id?: string;
    firstName: string | undefined;
    lastName: string ;
    gender: string;
    age: number;
    imageURL?: string;
    movies?: Movie[];
    
}