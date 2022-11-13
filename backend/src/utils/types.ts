export type CustomResponse<T> = {
   
    data?: T | T[] | null;
    
  };
  
  export type Credentials = {
    email: string;
    password: string;
  };
  
  export type PostMovieRequest = {
    title: string;
    overview: string;
    cost: number;
    image: string;
    year: string;
    actors: string[];
  };