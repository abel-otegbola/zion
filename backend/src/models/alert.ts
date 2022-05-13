import { ApiProperty } from '@nestjs/swagger';
export class Alert {
  @ApiProperty({ type: String, description: 'Id alert' })
  _id?: string;

  @ApiProperty({ type: String, description: 'Alert Name' })
  name: string;

  @ApiProperty({ type: String, description: '' })
  userId: string;

  notificationInfo: {
    via: string;
    url?: string;
    phone?: string;
    whatsapp?: string;
  };

  @ApiProperty({ type: String, description: '' })
  collectionId: string;

  @ApiProperty({ type: String, description: '' })
  collectionName: string;

  @ApiProperty({ type: String, description: '' })
  alertType: string;

  @ApiProperty({ type: String, description: '' })
  createdAt: string;

  @ApiProperty({ type: Boolean, description: 'alert is active' })
  isDisabled: boolean;
}
