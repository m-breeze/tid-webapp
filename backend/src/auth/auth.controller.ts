import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiImplicitBody, ApiResponse } from '@nestjs/swagger';
import { Public } from './auth.decorator';
import { AuthDTO } from './dto/auth.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  @ApiOperation({ title: 'login', operationId: 'login' })
  @ApiImplicitBody({ name: 'AuthDTO', type: AuthDTO })
  @ApiResponse({ status: 201, type: String })
  async login(@Body() body: AuthDTO): Promise<string> {
    return this.authService.login(body);
  }

  @Post('signup')
  @Public()
  @ApiOperation({ title: 'signUp', operationId: 'signUp' })
  @ApiImplicitBody({ name: 'AuthDTO', type: AuthDTO })
  @ApiResponse({ status: 201, type: String })
  async signup(@Body() body: AuthDTO): Promise<string> {
    return this.authService.signUp(body);
  }
}
