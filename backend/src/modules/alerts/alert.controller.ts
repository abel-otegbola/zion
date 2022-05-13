import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { AlertService } from './alert.service';
import { Alert } from './../../models/alert';
import { GenericResponse } from '../../models/generic-response';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAlertDto } from './dto/alert.dto';

@ApiTags('Alerts')
@Controller('alerts')
export class AlertController {
  constructor(private readonly alertService: AlertService) {}

  @ApiOperation({ summary: 'Get alerts' })
  @ApiResponse({ status: 200, description: 'Get alerts', type: Alert })
  @Get('getAlerts')
  getAlerts(@Req() req): Promise<Alert[]> {
    const userId = req.user._id;
    return this.alertService.getAlerts(userId);
  }

  @Post('addAlert')
  addAlert(@Req() req, @Body() creteAlertDto: CreateAlertDto): Promise<Alert> {
    return this.alertService.addAlert(creteAlertDto);
  }

  @Post('updateAlert')
  updateAlert(@Req() req, @Body() alert: Alert): Promise<GenericResponse> {
    return this.alertService.updateAlert(alert);
  }

  @Get('deleteAlert')
  deleteAlert(@Req() req, @Query('id') id: string): Promise<GenericResponse> {
    return this.alertService.deleteAlert(id);
  }
}