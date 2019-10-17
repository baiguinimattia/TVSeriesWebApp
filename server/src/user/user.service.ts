import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { CreateUserDto } from './dtos/createUser.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private readonly userModel: ReturnModelType<typeof User>) {

    }

    async create(createCatDto: CreateUserDto): Promise<User> {
        const createdUser = new this.userModel(createCatDto);
        return await createdUser.save();
    }

    async getAllUsers(): Promise<any> {
        return await this.userModel.find().exec();
    }

    async getUser(id: string) {
        return await this.userModel.findById(id);
    }

}
