import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';


@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  
  @Post()
  addBookmark(): Promise<User> {
    //user would have to be login to get his id, for test purpose we gonna make it static
    return this.userService.createUserAndBookmark();
  }
}
