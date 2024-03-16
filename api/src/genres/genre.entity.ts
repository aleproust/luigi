import { Optional } from '@nestjs/common';
import { Movie } from 'src/movies/movie.entity';
import { MovieToGenre } from 'src/movies/movies-genres.entity';
import { Entity, Column, PrimaryColumn, IsNull, OneToMany, ManyToMany } from 'typeorm';

@Entity({name: 'genres'})
export class Genre {
  @PrimaryColumn()
  id: number;

  @Column({nullable: true})  
  name: string;
  
  @ManyToMany(
    () => Movie,
    movie => movie.genres,
    {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'},
  )
  movies?: Movie[];
}