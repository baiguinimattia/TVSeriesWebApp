import { IsString } from 'class-validator';
import { prop } from '@typegoose/typegoose';

export class User {
    @IsString()
    @prop({ required: true, unique: true })
    email: string;
    @IsString()
    @prop({ required: true })
    password: string;
}
