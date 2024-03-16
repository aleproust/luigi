import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TmdbModule } from './tmdb/tmdb.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    TmdbModule,
    DatabaseModule],
  providers: [AppService]
})
export class AppModule {}
