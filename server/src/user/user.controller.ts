import { Controller, Post, Body, Get, HttpException, HttpStatus } from '@nestjs/common';
import { User } from './user.model';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {

    }

    @Post('create')
    async createUser(@Body() user: CreateUserDto): Promise<User> {
        try {
            return await this.userService.create(user);
        } catch (error) {
            if (error.code === 11000) {
                throw new HttpException('The username is already used!', HttpStatus.FORBIDDEN);
            } else{
                throw new HttpException('Bad request!', HttpStatus.BAD_REQUEST);
            }
        }
    }

    @Get('')
    async getAllUsers(): Promise<any> {
        return await this.userService.getAllUsers();
    }
}
