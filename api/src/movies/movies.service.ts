import { Injectable } from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './movie.entity';
import { Any, Between, FindOptions, FindOptionsOrder, In, Repository } from 'typeorm';
import { find } from 'rxjs';
import { Genre } from 'src/genres/genre.entity';

@Injectable()
export class MoviesService {
  constructor(@InjectRepository(Movie) private moviesRepository: Repository<Movie>){

  }

  findByGenre(genreId, sortBy, order): Promise<ReadonlyArray<Movie>> {
    return this.moviesRepository.createQueryBuilder('movies')
    .leftJoinAndSelect("movies.genres", "genre")
    .where('genre.id = :id',  { id: genreId})
    .orderBy(sortBy, order)
    .getMany()
    
  }


  // 1. Back end task 6
  findByReleaseDate(): Promise<ReadonlyArray<Movie>> {
    return this.moviesRepository.find({
      relations:{
        genres: true
      },
      where:{
        releaseDate: Between(new Date('2024-02-01'), new Date('2024-02-29'))
      },
      order: {rating: 'DESC'}
    })
  }

  
  findAll(sortBy = 'releaseDate', order = 'DESC'): Promise<ReadonlyArray<Movie>> {
    return this.moviesRepository.find(
      {
        relations:{
          genres: true
        },
        order: {[sortBy]: order}
        
      }
    )
  }

  findBookmarked(): Promise<ReadonlyArray<Movie>>{
    return this.moviesRepository.createQueryBuilder('movies')
    .innerJoinAndSelect('movies.users',
     "user",
     "user.name <> ''")    
    .getMany()
  }

}
