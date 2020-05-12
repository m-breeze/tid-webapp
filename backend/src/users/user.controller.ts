import { Controller, Get, Delete, Patch, Query, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { ApiOperation, ApiImplicitQuery, ApiBearerAuth, ApiResponse, ApiImplicitParam, ApiImplicitBody } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';
import { UpdateUserDTO, UserDTO } from './dto/user.dto';
import { Public } from 'src/auth/auth.decorator';
import { ISearchUserObject } from './interfaces/user.interfaces';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ title: 'search users', operationId: 'search' })
  @ApiImplicitQuery({ name: 'email', required: false })
  @ApiImplicitQuery({ name: 'username', required: false })
  @ApiImplicitQuery({ name: 'id', required: false })
  @ApiImplicitQuery({ name: 'name', required: false })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: [User] })
  async search(
    @Query('email') email?: string,
    @Query('username') username?: string,
    @Query('id') id?: string,
    @Query('name') name?: string,
  ): Promise<User[]> {
    const searchObject: ISearchUserObject = { email, username, id, name };
    return this.userService.search(searchObject);

  }

  @Get('exists')
  @Public()
  @ApiOperation({ title: 'check if user exists in db', operationId: 'search' })
  @ApiImplicitQuery({ name: 'email', required: false })
  @ApiImplicitQuery({ name: 'username', required: false })
  @ApiResponse({ status: 200, type: Boolean })
  async exists(
    @Query('email') email?: string,
    @Query('username') username?: string,
  ): Promise<boolean> {
    const searchObject = { email, username };
    const users = await this.userService.search(searchObject);
    return Boolean(users.length);
  }

  @Patch(':id')
  @ApiOperation({ title: 'update user by id', operationId: 'updateById' })
  @ApiImplicitParam({ name: 'id' })
  @ApiImplicitBody({ name: 'UpdateUserDTO', type: UpdateUserDTO })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: UserDTO })
  async update(@Param('id') id: number, @Body() body: UpdateUserDTO): Promise<User> {
    return this.userService.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({ title: 'delete user by id', operationId: 'deleteById' })
  @ApiImplicitParam({ name: 'id' })
  @ApiBearerAuth()
  @ApiResponse({ status: 204, type: null })
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.userService.delete(id);
  }
}
