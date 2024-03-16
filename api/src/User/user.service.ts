import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Bookmark } from "src/bookmark/bookmark.entity";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { generate} from "../utils/utils"

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Bookmark)
    private readonly bookmarkRepository: Repository<Bookmark>
  ) {}


  // 1. Back end task 5
  async createUserAndBookmark(createBookmark : {userId: string, movieId: number} = {userId: '', movieId:1022789}): Promise<User> {
    try{
      const user = await this.userRepository.save({
        name: generate(),
      })
  
      await this.bookmarkRepository.save({userId: user.id, movieId: createBookmark.movieId})
      return user;

    }
    catch(error){
      throw new error
    }
  }
}