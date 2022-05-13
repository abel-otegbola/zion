import { Body, Controller, Post } from '@nestjs/common';
import { User } from '../../models/user';
import { UserService } from './user.service';
import { GenericResponse } from './../../models/generic-response';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post("updateUser")
  // updateUser(@Body() user: User): Promise<GenericResponse> {
  //   return this.userService.updateUser(user);
  // }

  // @Post("addUser")
  // addUser(@Body() user: User): Promise<User> {
  //   return this.userService.addUser(user);
  // }
}
