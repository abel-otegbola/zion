import { IsNotEmpty, IsObject, IsString } from 'class-validator';

export class CreateAlertDto {
  // @IsNotEmpty()
  // @IsString()
  name: string;
  // @IsNotEmpty()
  // @IsString()
  userId: string;
  // @IsNotEmpty()
  // @IsObject()
  notificationInfo: {
    via: string;
    url?: string;
    phone?: string;
    whatsapp?: string;
  };
  // @IsNotEmpty()
  // @IsString()
  collectionId: string;
  // @IsNotEmpty()
  // @IsString()
  collectionName: string;
  // @IsNotEmpty()
  // @IsString()
  alertType: string;
}
