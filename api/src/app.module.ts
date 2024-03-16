import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { GenresModule } from './genres/genres.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { UserModule } from './user/user.module';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'example',
    database: 'postgres',
    autoLoadEntities: true,
    synchronize: true,
    logging:'all',
  }),
  MoviesModule,
  GenresModule,
  BookmarkModule, 
  UserModule]
})
export class AppModule {
  constructor(private dataSource: DataSource) {}

}
