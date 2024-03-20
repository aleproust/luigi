import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TmdbService } from './tmdb/tmdb.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  const tmdbService = app.get(TmdbService)
  // 1.Back end task: 1,2 
  await tmdbService.initGenres()
  await tmdbService.initMovies()
  await app.close();


}
bootstrap();
