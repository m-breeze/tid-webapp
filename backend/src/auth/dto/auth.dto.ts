import { ApiModelProperty } from '@nestjs/swagger';

export class AuthDTO {
  @ApiModelProperty()
  email: string;

  @ApiModelProperty()
  username: string;

  @ApiModelProperty()
  password: string;
}
