import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ProjectionType, QueryOptions } from 'mongoose';
import { User } from '../../models/user';
// import { GenericResponse } from './../../models/generic-response';

@Injectable()
export class UserService {
  constructor(@InjectModel('users') private readonly userModel: Model<User>) {}

  // updateUser(user: User): Promise<GenericResponse> {
  //   const query = { _id: user._id };
  //   console.log('query', query);
  //   return this.userModel
  //     .updateOne(query, user)
  //     .exec()
  //     .then((status) => {
  //       if (status.modifiedCount) {
  //         return new GenericResponse({ message: 'Updated successfully.' });
  //       } else {
  //         return new GenericResponse({ message: 'No match found to update.' });
  //       }
  //     });
  // }

  // addUser(user: User): Promise<User> {
  //   const userInfo = new this.userModel(user);
  //   return userInfo.save();
  // }

  async getUserByWalletId(walletId: string, projection?: ProjectionType<User>, options?: QueryOptions): Promise<User> {
    const filter = { walletId: walletId };
    const query = this.userModel.findOne(filter);

    projection && query.select(projection);
    options && query.setOptions(options);

    return await query.exec();
  }

}
