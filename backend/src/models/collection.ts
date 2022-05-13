import { ApiProperty } from '@nestjs/swagger';

export class Collection {
  @ApiProperty({ type: String, description: 'Id collection' })
  _id?: string;
  @ApiProperty({ type: String, description: 'Key of collection' })
  key?: String;
  @ApiProperty({ type: String, description: 'Verification Status' })
  verified?: Boolean;
  @ApiProperty({ type: String, description: 'Name of the Collection' })
  name?: String;
  @ApiProperty({ type: String, description: 'Symbol of the Collection' })
  symbol?: String;
  @ApiProperty({ type: String, description: 'Canymachine Ids' })
  candyMachineIds?: any[];
  @ApiProperty({ type: String, description: 'Image Url of the collection' })
  image?: String;
  @ApiProperty({ type: String, description: 'Description of the collection' })
  description?: String;
  @ApiProperty({ type: String, description: 'Website Url' })
  website?: String;
  @ApiProperty({ type: String, description: 'Twitter Url' })
  twitter?: String;
  @ApiProperty({ type: String, description: 'Discord Url' })
  discord?: String;
  @ApiProperty({ type: String, description: 'Number of Items' })
  totalItems?: String;
  @ApiProperty({ type: String, description: 'Traits available' })
  available_traits?: any[];
  @ApiProperty({ type: String, description: 'Attributes available' })
  available_attributes?: any[];
  @ApiProperty({ type: String, description: 'Attributes Indexed' })
  attributes_indexed?: boolean;
  @ApiProperty({ type: String, description: 'Status of Items Tracked' })
  itemsTracked?: boolean;
}
export class BotCollection {
  @ApiProperty({ type: String, description: 'Id collection' })
  _id?: string;

  @ApiProperty({ type: String, description: 'Name of collection' })
  name?: string;

  @ApiProperty({ type: Boolean, description: 'Status of Items Tracked' })
  itemsTracked?: boolean;

  @ApiProperty({ type: Boolean, description: 'Status of Attributes Indexed' })
  attributes_indexed?: boolean;

  @ApiProperty({ type: Boolean, description: 'Collecton of traits' })
  available_traits?: any[];
}

export class CollectionTrait {
  @ApiProperty({ type: Boolean, description: 'Status of Items Tracked' })
  totalItems?: number;

  @ApiProperty({ type: Boolean, description: 'Status of Items Tracked' })
  itemsTracked?: any[];

  available_traits?: any[];
}
