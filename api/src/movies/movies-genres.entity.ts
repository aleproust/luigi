import { Genre } from "src/genres/genre.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Movie } from "./movie.entity";

@Entity({name:'movies_genres'})
export class MovieToGenre {


    @PrimaryColumn({name:'genre_id'})
    public genreId: number

    @PrimaryColumn({name: 'movie_id'})
    public movieId: number

}