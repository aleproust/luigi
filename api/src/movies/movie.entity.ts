import { Genre } from 'src/genres/genre.entity';
import { Entity, Column, PrimaryColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { MovieToGenre } from './movies-genres.entity';
import { User } from 'src/user/user.entity';

@Entity({name: 'movies'})
export class Movie {
  @PrimaryColumn()
  id: number;

  @Column({nullable: true})
  title: string;

  @Column({nullable: true})
  language: string;

  @Column({nullable: true, type: 'decimal'})
  popularity: number;

  @Column({name:'release_date', nullable: true})
  releaseDate: Date;

  @ManyToMany(
    () => Genre, 
    genre => genre.name,
    {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'})
    @JoinTable({
      name: 'movies_genres',
      joinColumn: {
        name: 'movie_id',
        referencedColumnName: 'id',
      },
      inverseJoinColumn: {
        name: 'genre_id',
        referencedColumnName: 'id',
      },
    })
    genres?: Genre[];

  @ManyToMany(
      () => User, 
      user => user.movies,
      {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'})
      @JoinTable({
        name: 'bookmark',
        joinColumn: {
          name: 'movie_id',
          referencedColumnName: 'id',
        },
        inverseJoinColumn: {
          name: 'user_id',
          referencedColumnName: 'id',
        },
      })
      users?: User[];


  
  @Column({nullable: true, type: 'decimal'})
  rating: number;
}