import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Collection, CollectionTrait } from './../../models/collection';
import { Token } from './../../models/token';

@Injectable()
export class CollectionService {
  constructor(
    @InjectModel('nft_collections')
    private readonly collectionModel: Model<any>,
    @InjectModel('tokens') private readonly tokenModel: Model<Token>,
  ) {}

  getCollections(
    searchText: string,
    pageNo = 1,
    count = 20,
    collection_ids: string[] = [],
  ): Promise<Collection[]> {
    pageNo = pageNo - 1;
    const query: any = { itemsTracked: true };

    if (searchText) {
      query.name = { $regex: new RegExp(searchText.toLowerCase(), 'i') };
    }

    if (collection_ids && collection_ids.length) {
      const _ids = [];
      collection_ids.forEach((element) => {
        _ids.push(element);
      });
      query._id = { $in: collection_ids };
    }

    const offset = pageNo * count

    return this.collectionModel
      .find(query)
      .limit(count * 1)
      .skip(offset)
      .sort({ _id: 1 })
      .exec();
  }

  getCollectionById(collectionId: string): Promise<Collection> {
    const query: any = { itemsTracked: true };
    if (collectionId && collectionId.length) {
      query._id = collectionId;
    }
    return this.collectionModel.findOne(query).exec();
  }

  async getCollectionTraits(
    collectionName: string,
  ): Promise<CollectionTrait[]> {
    const query = {
      name: {
        $regex: new RegExp('^' + collectionName.toLowerCase() + '$', 'i'),
      },
    };
    // const query = {
    //   name: {
    //     $regex: new RegExp('^' + collectionName.toLowerCase() + '$', 'i'),
    //   },
    // };
    return this.collectionModel
      .findOne(query)
      .select({ name: 1, totalItems: 1, available_traits: 1 })
      .exec();
  }

  searchCollection(): Promise<Collection[]> {
    const query: any = [
      {
        $match: { itemsTracked: true },
      },
      {
        $lookup: {
          from: 'tokens',
          as: 'matches',
          let: {
            collectionId: '$_id',
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [{ $eq: ['$collection_id', '$$collectionId'] }],
                },
              },
            },
            {
              $limit: 1,
            },
          ],
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          image: '$matches.image',
        },
      },
      {
        $sort: { name: 1 },
      },
    ];
    // query.itemsTracked=true;
    // query.attributes_indexed=true;

    return this.collectionModel.aggregate(query).exec();
    //   let query: any = { name: { $exists: true } };
    //   query.itemsTracked = true;
    //   query.attributes_indexed = true;
    //   return this.collectionModel
    //     .find(query)
    //     .select({ name: 1, image: 1 })
    //     .sort({ name: 1 })
    //     .exec();
  }
}
