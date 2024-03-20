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
    console.log('Start fetching movies...')
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
    console.log('End fetching movies.')
    console.log('Start populating movies...')
    this.databaseService.populateMovies(movies)
    console.log('End fetching movies.')
    console.log('Start populating join table movies_genres...')
    this.databaseService.populateMoviesGenres(moviesGenres)
    console.log('End populating join table movies_genres.')



    }

    // Function populates genres table from tmdb api
    async initGenres(): Promise<void> {
        console.log('Start fetching genres...')
        const genres = await lastValueFrom(this.httpService.get('https://api.themoviedb.org/3/genre/movie/list', this.options)
        .pipe(map(({data}) => data.genres.map(({id, name})=> `${id}\t${name}\n`))))
        console.log('End fetching genres.')
        console.log('Start populating genres...')
        this.databaseService.populateGenres(genres)
        console.log('End populating genres.')
    }
}
