export class GetTokenListinsDto {
  collectionId?: string;
  pageNo?: number;
  count?: number;
  rankRange?: { min?: number; max?: number };
  traits?: { type?: string; value?: string[] }[];
  eventType?: string;
}
