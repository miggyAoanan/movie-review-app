import { Movie } from "./movie";

export interface Actor {
   
    id?: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    gender: string| undefined;
    age: number | undefined;
    imageURL?: string | undefined;
    
}

export interface ActorDetails {
    id?: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    gender: string | undefined;
    age: number| undefined;
    imageURL?: string | undefined;
    movies?: Movie[];
    
}