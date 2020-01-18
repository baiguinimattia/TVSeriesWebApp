import { Controller, Post, Body, ValidationPipe, Res, HttpException, HttpStatus, Get, UseGuards } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('/signUp')
    signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.authService.signUp(authCredentialsDto);
    }

    @Post('/signIn')
    async sigIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto, @Res() response: Response) {

        const token = await this.authService.signIn(authCredentialsDto);
        // response.header('authorization', 'Bearer ' + token.accessToken);
        response.cookie('authorization', token);
        response.send({token});
    }

    @Get('sync')
    @UseGuards(AuthGuard())
    async sync(@Res() response: Response): Promise<any> {
        response.json({
            isAuthenticated: true,
        });
    }

}
