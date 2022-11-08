export interface Review {
    id?: string;
    description: string;
    rating: number;
    userId: string;
    userName?: string;
    movieName?: string;
    movieId?: string;
    isActive?: boolean;
 
}