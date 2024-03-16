import { lastValueFrom, map, tap } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class TmdbService {

    private options = {
        method: 'GET',
        headers: {
        accept: 'application/json',
        Authorization: 'Bearer <your token>'
        }
    };
    constructor(private readonly httpService: HttpService, private databaseService:DatabaseService){}
    

    // Function populates movies and movies_genre table from tmdb api
    async initMovies(): Promise<void> {
  
    // Get number of pages to scroll from the api to get complete list of movies
    // const pages = await lastValueFrom(this.httpService.get('https://api.themoviedb.org/3/discover/movie?page=1&sort_by=popularity.desc', this.options).pipe(
    //     map(({data})=> data.total_pages)
    // ))
    let movies = ''
    let moviesGenres = ''

    // For test purpose, we gonna iterate only 3 times
    // Iterate on pages
    //for(let i=1; i <= pages; i++){
    
    
    // Iterate over pages from the API
    //
    for(let i=1; i <= 3; i++){         
            await lastValueFrom(this.httpService.get(`https://api.themoviedb.org/3/discover/movie?page=${i}&sort_by=popularity.desc`, this.options).pipe(
            tap (({data}) => data.results.forEach(({id, original_title, original_language, popularity, release_date, genre_ids,vote_average}) => 
                {
                    movies = `${movies}${id}\t${original_title}\t${original_language}\t${popularity}\t${release_date}\t${vote_average}\n`,
                    moviesGenres =  `${moviesGenres}${genre_ids.reduce((acc, curr) => `${acc}${id}\t${curr}\n`, '' )}`
            }
                ) 
        ))).catch(error => new Error(error))
        
    }
    
    this.databaseService.populateMovies(movies)
    this.databaseService.populateMoviesGenres(moviesGenres)


    }

    // Function populates genres table from tmdb api
    async initGenres(): Promise<void> {
        const genres = await lastValueFrom(this.httpService.get('https://api.themoviedb.org/3/genre/movie/list', this.options)
        .pipe(map(({data}) => data.genres.map(({id, name})=> `${id}\t${name}\n`))))

        this.databaseService.populateGenres(genres)

    }
}
