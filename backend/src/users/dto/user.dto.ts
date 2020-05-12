import { ApiModelPropertyOptional } from '@nestjs/swagger';

// tslint:disable:variable-name

export class UserDTO {
  @ApiModelPropertyOptional()
  id?: number;

  @ApiModelPropertyOptional()
  username?: string;

  @ApiModelPropertyOptional()
  name?: string;

  @ApiModelPropertyOptional()
  email?: string;

  @ApiModelPropertyOptional()
  img?: string;

  @ApiModelPropertyOptional({type: 'string', format: 'date-time'})
  updated_at?: Date;
}

export class UpdateUserDTO {
  @ApiModelPropertyOptional()
  email?: string;

  @ApiModelPropertyOptional()
  username?: string;

  @ApiModelPropertyOptional()
  name?: string;
}
