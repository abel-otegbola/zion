import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CollectionService } from './collection.service';
import { Collection, CollectionTrait } from './../../models/collection';

@ApiTags('collections')
@Controller('collections')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @ApiOperation({ summary: 'Get collections' })
  @ApiResponse({ status: 200, description: 'Get chats', type: Collection })
  @Get('getCollections')
  getCollections(
    @Req() req, 
    @Query('searchText') searchText: string,
    @Query('pageNo') pageNo: number,
    @Query('count') count: number,
  ): Promise<Collection[]> {
    return this.collectionService.getCollections(searchText, pageNo, count);
  }

  @Get('getCollectionById')
  getCollectionById(
    @Query('collectionId') collectionId: string,
  ): Promise<Collection> {
    return this.collectionService.getCollectionById(collectionId);
  }

  @Post('getCollectionTraits')
  async getCollectionTraits(
    @Req() req, 
    @Body('collectionName') collectionName: string,
  ): Promise<CollectionTrait[]> {
    const CollectionTraitInfo =
      await this.collectionService.getCollectionTraits(collectionName);
    if (!CollectionTraitInfo) {
      throw new NotFoundException('No traits found for this collection');
    }
    return CollectionTraitInfo;
  }

  @Post('getCollectionTraitsCount')
  async getCollectionTraitsCount(
    @Req() req, 
    @Body('collectionName') collectionName: string,
  ): Promise<number> {
    const collectionInfo = await this.collectionService.getCollectionTraits(
      collectionName,
    );
    const count = collectionInfo[0].available_traits.length;
    return count;
  }

  @Get('searchCollections')
  searchCollection(@Req() req): Promise<Collection[]> {
    return this.collectionService.searchCollection();
  }
}
