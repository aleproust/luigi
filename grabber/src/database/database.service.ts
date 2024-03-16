
import { Injectable } from '@nestjs/common';
import postgres from 'postgres';
import { pipeline } from 'node:stream/promises'
import { Readable } from 'node:stream';

@Injectable()
export class DatabaseService {
  private sql;
  constructor(){
    try{
      this.sql = postgres({host: 'localhost', port: 5432, database:'postgres',user:'postgres', password:'example'}) 
    } catch(er){
      console.log(er)
    }
    
  }
  
  async populateMovies(movies){
    const movieStream = Readable.from(movies)
    const dumpMovies = await this.sql`copy movies (id, title, language, popularity, release_date, rating) from stdin`.writable()
    await pipeline(movieStream, dumpMovies);   
  }

  async populateGenres(genre){
    const genreStream = Readable.from(genre)   
    const dumpGenres = await this.sql`copy genres (id, name) from stdin`.writable()    
    await pipeline(genreStream, dumpGenres);
      
  }
  async populateMoviesGenres(moviesGenres){
    const genreStream = Readable.from(moviesGenres)   
    const dumpMoviesGenres = await this.sql`copy movies_genres (movie_id, genre_id) from stdin`.writable()    
    await pipeline(genreStream, dumpMoviesGenres);
  }
}