import { Controller, Get, Query, Req } from '@nestjs/common';
import { ActiveListing, ActiveListingResponse } from '../../models/active-listing';
import { ActiveListingService } from './active-listing.service';
import { TokenService } from './../token/token.service';
import { Token } from "../../models/token";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Active Listing")
@Controller('activeListing')
export class ActiveListingController {
  constructor(private readonly activeListingService: ActiveListingService, private tokenService: TokenService) { }

  @Get('getActiveListing')
  async getActiveListing(
    @Req() req,
    @Query('collectionName') collectionName: string,
    @Query('pageNo') pageNo: number,
    @Query('count') count: number,
  ): Promise<ActiveListingResponse> {
    let listings = await this.activeListingService.getActiveListing(collectionName, pageNo, count);

    const _ids = listings.map((listing) => listing._id);

    // no need to pass page no as we are searching the records
    const tokens = await this.tokenService.getTokens({ count: count, _ids: _ids });

    listings = listings.map((listing: ActiveListing) => {
      const tokenInfo = tokens.find((token: Token) => token._id === listing._id);
      let newListing = new ActiveListing(listing);
      if (tokenInfo) {
        newListing.name = tokenInfo.name;
        newListing.rank = tokenInfo.rank;
        newListing.image = tokenInfo.image || null;
      } else {
        console.log("Token missing for _id: ", listing._id);
      }
      return newListing;
    });

    const activeListingResponse = new ActiveListingResponse({ data: listings });
    return activeListingResponse;
  }

}
