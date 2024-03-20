import { Controller, Get, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './movie.entity';

@Controller('/movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getMovies(
    @Query('releaseMonth') releaseMonth: boolean = false, 
    @Query('genreId') genreId, 
    @Query('sortBy') sortBy = 'releaseDate', 
    @Query('order')order = 'DESC',
    @Query('bookmarked') isBookmarked: boolean = false): Promise<ReadonlyArray<Movie>> {
    if(genreId){
      return this.moviesService.findByGenre(genreId, sortBy, order);
    }else if(releaseMonth){
      return this.moviesService.findByReleaseDate()
    }
    else if(isBookmarked){
      return this.moviesService.findBookmarked()
    }
    

    else{
      return this.moviesService.findAll(sortBy, order)
      
    }
    
  }
 
}
