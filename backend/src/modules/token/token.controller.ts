import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Token } from '../../models/token';
import { GetTokenListinsDto } from './dto/tokens.dto';
import { TokenService } from './token.service';

@ApiTags('Tokens')
@Controller('token')
export class TokenController {
  EVENT_TYPES = {
    ALL: 'ALL',
  };

  PRICE = {
    ASC: 'ASC',
  };

  constructor(private readonly tokenService: TokenService) {}

  @Get('getToken')
  getToken(
    @Query('pageNo') pageNo: number,
    @Query('count') count: number,
  ): Promise<Token[]> {
    return this.tokenService.getTokens({
      pageNo: pageNo,
      count: count,
    });
  }

  @Post('tokenListings')
  async getTokenListings(
    @Body('collectionId') collectionId: string,
    @Body('pageNo') pageNo: number,
    @Body('count') count: number,
    @Body('rankRange') rankRange: { min; max },
    @Body('traits') traits: { type; value: string[] }[],
    @Body('eventType') eventType: string,
    @Body('price') price: string,
  ): Promise<Token[]> {
    if (eventType === this.EVENT_TYPES.ALL) {
      return this.tokenService.getTokensListing(
        collectionId,
        pageNo,
        count,
        rankRange,
        traits,
      );
    } else {
      if (price === this.PRICE.ASC) {
        return this.tokenService.getLowPriceSellOrderByCollection(
          collectionId,
          pageNo,
          count,
          rankRange,
          traits,
        );
      } else {
        return this.tokenService.getHighPriceSellOrderByCollection(
          collectionId,
          pageNo,
          count,
          rankRange,
          traits,
        );
      }
    }
  }
  @Get('tokenListingObjectBt')
  async getTokenListingObjectBt(
    @Query('tokenId') tokenId: string,
  ): Promise<any> {
    const response = await this.tokenService.getTransactionMevByMint(tokenId);
    const maxBt = Math.max.apply(
      Math,
      response.map(function (o) {
        return o.bt;
      }),
    );

    return { bt: maxBt };
  }

  @Post('getBracketTokens')
  async getBracketTokens(
    @Body('collectionId') collectionId: string,
    @Body('bracket') bracket: string,
  ): Promise<any> {
    return this.tokenService.getBracketTokens(collectionId, bracket);
  }

  @Get('tokenListingObject')
  async getTokenListingObject(@Query('tokenId') tokenId: string): Promise<any> {
    let result;
    const response: any = await Promise.allSettled([
      this.tokenService.getTokenListingObject(tokenId),
      this.tokenService.getSellOrderByMint(tokenId),
      // this.tokenService.getTransactionMevByMint(tokenId),
    ]);

    // const maxBt = Math.max.apply(
    //   Math,
    //   response[2].value.map(function (o) {
    //     return o.bt;
    //   }),
    // );

    // console.log("max", maxBt);
    result = {
      ...response[0].value,
      ...response[1].value,
      // ...{ bt: maxBt }
    };

    result.listing_account = result._id;
    result.token_account = result.seller_token_account;
    delete result._id;
    delete result.seller_token_account;

    return result;
  }

  @Post('getCollectionImage')
  getCollectionImage(
    @Body('collectionId') collectionId: string,
  ): Promise<Token> {
    return this.tokenService.getCollectionImage(collectionId);
  }
}
