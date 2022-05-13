import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Token } from '../../models/token';
import { GetTokenListinsDto } from './dto/tokens.dto';

var mongoose = require('mongoose');

@Injectable()
export class TokenService {
  constructor(
    @InjectModel('tokens') private readonly tokenModel: Model<Token>,
    @InjectModel('sell_orders') private readonly sellOrdersModel: Model<any>,
    @InjectModel('transactions_mev2')
    private readonly transactionMev2Model: Model<Token>,
  ) {}

  getTokens({ pageNo = 1, count = 20, _ids = [] }): Promise<Token[]> {
    pageNo = pageNo - 1;

    let query = {};

    if (_ids && _ids.length) {
      query = {
        _id: { $in: _ids },
      };
    }

    return this.tokenModel
      .find(query)
      .limit(count * 1)
      .select({ name: 1, rank: 1, image: 1 })
      .skip(pageNo * count)
      .sort({ _id: 1 })
      .exec();
  }

  private _getTokenListingMatchQuery(
    collectionId: string,
    rankRange: { min; max },
    traits: { type: string; value: string[] }[],
  ): any {
    const _matchQuery: any = {
      collection_id: mongoose.Types.ObjectId(collectionId),
    };
    const _traitsFilter = [];
    if (traits && traits.length) {
      traits.forEach((trait) => {
        let _attribute;
        if (trait.value.length > 1) {
          const _orConditions = [];
          trait.value.forEach((traitValue) => {
            _orConditions.push({
              attributes: {
                $elemMatch: {
                  trait_type: trait.type,
                  value: traitValue,
                },
              },
            });
          });

          _attribute = {
            $or: _orConditions,
          };
        } else {
          _attribute = {
            attributes: {
              $elemMatch: {
                trait_type: trait.type,
                value: trait.value[0],
              },
            },
          };
        }

        _traitsFilter.push(_attribute);
      });
      _matchQuery.$and = [..._traitsFilter];
    }

    if (rankRange && rankRange.max) {
      _matchQuery.rank = { $gte: rankRange.min, $lte: rankRange.max };
    }

    return _matchQuery;
  }

  async getTokensListing(
    collectionId: string,
    pageNo = 1,
    count = 20,
    rankRange: { min; max },
    traits: { type: string; value: string[] }[],
  ): Promise<Token[]> {
    pageNo = pageNo - 1;
    if (!collectionId) {
      throw new NotFoundException('No nft found');
    }

    const _matchQuery = this._getTokenListingMatchQuery(
      collectionId,
      rankRange,
      traits,
    );

    console.log('_matchQuery', _matchQuery);
    const query: any = [
      {
        $match: _matchQuery,
      },
      {
        $group: {
          _id: '$_id',
          rank: { $first: '$rank' },
          image: { $first: '$image' },
          collection_name: { $first: '$collection_name' },
          name: { $first: '$name' },
          collection_id: { $first: '$collection_id' },
          attributes: { $first: '$attributes' },
        },
      },
      { $sort: { rank: 1 } },
      {
        $skip: pageNo * count,
      },
      {
        $limit: count * 1,
      },
    ];

    return this.tokenModel.aggregate(query).exec();
  }

  async getTokenListingCount(
    tokenListingCountDto: GetTokenListinsDto,
  ): Promise<number> {
    const { collectionId, rankRange, traits }: any = tokenListingCountDto;
    if (!collectionId) {
      throw new NotFoundException('No nft found');
    }

    const _matchQuery = this._getTokenListingMatchQuery(
      collectionId,
      rankRange,
      traits,
    );

    const query = [
      {
        $match: _matchQuery,
      },
      {
        $group: {
          _id: '$_id',
          rank: { $first: '$rank' },
          image: { $first: '$image' },
          collection_id: { $first: '$collection_id' },
          collection_name: { $first: '$collection_name' },
          attributes: { $first: '$attributes' },
        },
      },
    ];

    return (await this.tokenModel.aggregate(query).exec()).length;
  }

  async getSellOrdersListingCount(
    tokenListingCountDto: GetTokenListinsDto,
  ): Promise<number> {
    const { collectionId, rankRange, traits }: any = tokenListingCountDto;
    if (!collectionId) {
      throw new NotFoundException('No nft found');
    }

    const _matchQuery = this._getTokenListingMatchQuery(
      collectionId,
      rankRange,
      traits,
    );

    console.log('_matchQuery', _matchQuery);
    const query = [
      { $match: { collection_id: mongoose.Types.ObjectId(collectionId) } },
      {
        $lookup: {
          from: 'tokens',
          localField: 'mint',
          foreignField: '_id',
          as: 'fromItems',
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ $arrayElemAt: ['$fromItems', 0] }, '$$ROOT'],
          },
        },
      },

      { $match: _matchQuery },

      {
        $project: { fromItems: 0 },
      },
    ];
    return (await this.sellOrdersModel.aggregate(query).exec()).length;
  }

  async getTokenListingObject(tokenId: string): Promise<any> {
    const query = [{ $match: { _id: tokenId } }, { $project: { ranks: 0 } }];
    const tokens = await this.tokenModel.aggregate(query).exec();
    return tokens[0];
  }
  async getSellOrderByMint(mint: string): Promise<any> {
    const query = {
      mint: mint,
    };
    return (
      await this.sellOrdersModel
        .findOne(query)
        .select({ _id: 0, mint: 0, collection_id: 0 })
        .exec()
    ).toObject();
  }
  // async getTokenListingObject(tokenId: string): Promise<any[]> {
  //   const query = [
  //     { $match: { _id: tokenId } },
  //     // {
  //     //   $lookup: {
  //     //     from: 'tokens',
  //     //     localField: 'mint', // on which using aggergate
  //     //     foreignField: '_id', // joined table
  //     //     as: 'fromItems',
  //     //   },
  //     // },
  //     // {
  //     //   $replaceRoot: {
  //     //     newRoot: {
  //     //       $mergeObjects: [{ $arrayElemAt: ['$fromItems', 0] }, '$$ROOT'],
  //     //     },
  //     //   },
  //     // },
  //     {
  //       $project: {
  //         ranks: 0,
  //         // "token_account": "$seller_token_account",
  //         // "listing_account": "$_id",
  //         // mint: 0
  //       },
  //     },
  //   ];
  //   const tokens = await this.tokenModel.aggregate(query).exec();
  //   return tokens;
  // }
  // async getSellOrderByMint(mint: string): Promise<any> {
  //   const query = {
  //     mint: mint,
  //   };
  //   return (
  //     await this.sellOrdersModel
  //       .findOne(query)
  //       .select({ _id: 0, mint: 0, collection_id: 0 })
  //       .exec()
  //   ).toObject();
  // }

  async getTransactionMevByMint(mint: string): Promise<any[]> {
    const query = { 'parsed.event_type': 'LIST', 'parsed.mint': mint };
    return this.transactionMev2Model
      .find(query)
      .select({ parsed: 0, tx: 0, _id: 0 })
      .exec();
  }

  async getLowPriceSellOrderByCollection(
    collectionId: string,
    pageNo = 1,
    count = 20,
    rankRange: { min; max },
    traits: { type: string; value: string[] }[],
  ): Promise<any[]> {
    pageNo = pageNo - 1;
    const _matchQuery = this._getTokenListingMatchQuery(
      collectionId,
      rankRange,
      traits,
    );

    console.log('_matchQuery', _matchQuery);
    const query: any = [
      { $match: { collection_id: mongoose.Types.ObjectId(collectionId) } },
      {
        $lookup: {
          from: 'tokens',
          localField: 'mint',
          foreignField: '_id',
          as: 'fromItems',
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ $arrayElemAt: ['$fromItems', 0] }, '$$ROOT'],
          },
        },
      },
      { $sort: { amount: 1 } },
      { $match: _matchQuery },

      {
        $skip: pageNo * count,
      },
      {
        $limit: count * 1,
      },
      {
        $project: { fromItems: 0 },
      },
    ];

    console.log('query', query);

    return this.sellOrdersModel.aggregate(query).exec();
  }
  async getHighPriceSellOrderByCollection(
    collectionId: string,
    pageNo = 1,
    count = 20,
    rankRange: { min; max },
    traits: { type: string; value: string[] }[],
  ): Promise<any[]> {
    pageNo = pageNo - 1;
    const _matchQuery = this._getTokenListingMatchQuery(
      collectionId,
      rankRange,
      traits,
    );

    console.log('_matchQuery', _matchQuery);
    const query: any = [
      { $match: { collection_id: mongoose.Types.ObjectId(collectionId) } },
      {
        $lookup: {
          from: 'tokens',
          localField: 'mint',
          foreignField: '_id',
          as: 'fromItems',
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ $arrayElemAt: ['$fromItems', 0] }, '$$ROOT'],
          },
        },
      },
      { $sort: { amount: -1 } },
      { $match: _matchQuery },

      {
        $skip: pageNo * count,
      },
      {
        $limit: count * 1,
      },
      {
        $project: { fromItems: 0 },
      },
    ];

    console.log('query', query);

    return this.sellOrdersModel.aggregate(query).exec();
  }

  getCollectionImage(collectionId: string): Promise<Token> {
    const query = { collection_id: collectionId, image: { $exists: 1 } };
    return this.tokenModel.findOne(query).select({ image: 1 }).exec();
  }

  getBracketTokens(collectionId: string, bracket: string): Promise<Token[]> {
    const query = { collection_id: collectionId, bracket: bracket };
    return this.tokenModel.find(query).exec();
  }

  replaceAll(target, search, replacement) {
    return target.replace(new RegExp(search, 'g'), replacement);
  }
}
