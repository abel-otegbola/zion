import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ActiveListing } from '../../models/active-listing';

@Injectable()
export class ActiveListingService {
  constructor(
    @InjectModel('active_listings')
    private readonly activeListingModel: Model<ActiveListing>,
  ) {}

  getActiveListing(
    collectionName: string,
    pageNo = 1,
    count = 20,
  ): Promise<ActiveListing[]> {
    pageNo = pageNo - 1;
    const query: any = {};

    if (collectionName) {
      query.collection_name = collectionName;
    }
    return this.activeListingModel
      .find(query)
      .limit(count * 1)
      .select({ marketplace: 1, amount: 1 })
      .skip(pageNo * count)
      .sort({ _id: 1 })
      .exec();
  }

  getActiveListingCount(collectionName): Promise<number> {
    const query: any = {};
    if (collectionName) {
      query.collection_name = collectionName;
    }
    return this.activeListingModel.countDocuments(query).exec();
  }
}
