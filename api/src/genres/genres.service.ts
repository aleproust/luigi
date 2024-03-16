import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Genre } from './genre.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GenresService {
  constructor(@InjectRepository(Genre) private genreRepository: Repository<Genre>){

  }
  findAll(): Promise<ReadonlyArray<Genre>> {
    return this.genreRepository.find();
  }

  findByGenreName(genre): Promise<ReadonlyArray<Genre>> {
    return this.genreRepository.find({
      where: {id: genre}
  });
  }
}
