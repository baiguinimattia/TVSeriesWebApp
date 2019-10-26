import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    private expirationTime = 86400000; // 1 day Unix time stamp

    constructor(@InjectRepository(UserRepository) private userRepository: UserRepository,
                private jwtService: JwtService,
    ) {

    }

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.userRepository.signUp(authCredentialsDto);
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        const email = await this.userRepository.validateUserPassword(authCredentialsDto);

        if (!email) {
            throw new UnauthorizedException('Invalid credentials!');
        }
        const expiresAt = JSON.stringify(new Date().getTime() + this.expirationTime);
        const payload: JwtPayload = { email, expiresAt };
        const accessToken = await this.jwtService.sign(payload);

        return { accessToken };
    }
}
