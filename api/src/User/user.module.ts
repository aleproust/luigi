import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { BookmarkModule } from '../bookmark/bookmark.module';
import { Bookmark } from 'src/bookmark/bookmark.entity';


@Module({
  controllers:[UserController],
  providers:[UserService],
  imports: [TypeOrmModule.forFeature([User, Bookmark])]
})
export class UserModule {}
