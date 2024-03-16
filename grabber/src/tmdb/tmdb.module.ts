import { Module } from '@nestjs/common';
import { TmdbService } from './tmdb.service';
import { HttpModule } from '@nestjs/axios';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [HttpModule, DatabaseModule],
  providers: [TmdbService],
})
export class TmdbModule {}
