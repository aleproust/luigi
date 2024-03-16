import { Controller, Get, Param, Query } from '@nestjs/common';
import { GenresService } from './genres.service';
import { Genre } from './genre.entity';

@Controller('/genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Get()
  getGenres(@Query('genreId') genres): Promise<ReadonlyArray<Genre>> {
    return this.genresService.findAll();
  }
}
