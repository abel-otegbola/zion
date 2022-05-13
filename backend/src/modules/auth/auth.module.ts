import { Module } from '@nestjs/common';
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './../users/schemas/user.schema';
import { UserService } from './../users/user.service';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "users", schema: UserSchema }
    ])
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService],
})
export class AuthModule { }
