import { EntityRepository, Repository } from 'typeorm';
import { User } from '../auth/user.entity';
import { Show } from './tv.entity';
import { AddShowDto } from './dto/add-show.dto';
import { InternalServerErrorException, HttpException } from '@nestjs/common';

@EntityRepository(Show)
export class TvRepository extends Repository<Show> {

    async addShow(
        addShowDto: AddShowDto,
        user: User,
    ): Promise<void> {
        const { id } = addShowDto;
        if (!user.myList.filter(el => {
            return el.show_id == id
        }).length) {
            const show = new Show();
            show.show_id = id;
            show.user = user;
            try {
                await show.save();
            } catch (err) {
                throw new InternalServerErrorException();
            }
            return;
        } else {
            throw new HttpException('Already exists!', 204);
        }
    }

    async removeShow(
        id: string,
    ): Promise<any> 
    {
        try {
           return await Show.delete({show_id: id});
        } catch (err) {
            throw new HttpException(err.message, 500);
        }
    }
}

