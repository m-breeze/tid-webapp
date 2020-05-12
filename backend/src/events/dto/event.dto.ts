import { ApiModelPropertyOptional, ApiModelProperty } from '@nestjs/swagger';

// tslint:disable:variable-name
export class EventDTO {
  @ApiModelPropertyOptional()
  id?: number;

  @ApiModelPropertyOptional()
  title?: string;

  @ApiModelPropertyOptional()
  description?: string;

  @ApiModelPropertyOptional({type: 'string', format: 'date-time'})
  date?: Date;

  @ApiModelPropertyOptional()
  img?: string;

  @ApiModelPropertyOptional({type: 'string', format: 'date-time'})
  created_at?: Date;
}

export class CreateEventDTO {
  @ApiModelProperty()
  title: string;

  @ApiModelPropertyOptional()
  description?: string;

  @ApiModelProperty({type: 'string', format: 'date-time'})
  date: Date;

  @ApiModelPropertyOptional()
  img?: string;

  @ApiModelPropertyOptional()
  user_id?: number;
}

export class UpdateEventDTO {
  @ApiModelPropertyOptional()
  title?: string;

  @ApiModelPropertyOptional()
  description?: string;

  @ApiModelPropertyOptional({type: 'string', format: 'date-time'})
  date?: Date;

  @ApiModelPropertyOptional()
  img?: string;
}
