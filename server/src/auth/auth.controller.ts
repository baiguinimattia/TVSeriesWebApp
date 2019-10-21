import { Controller, Post, Body, ValidationPipe, Res, HttpException, HttpStatus } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { Response } from 'express';

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
            response.header('authorization', 'Bearer ' + token.accessToken);
            response.send({
                success: true,
                token,
            });
    }
}
