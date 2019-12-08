import { Controller, UseGuards, Get, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PersonService } from './person.service';
import { Observable } from 'rxjs';

@Controller('person')
@UseGuards(AuthGuard())
export class PersonController {

    constructor(private readonly personService: PersonService) {
    }

    @Get(':id')
    getDetails(@Param('id') id: string): Observable<any> {
        return this.personService.getPersonDetails(id);
    }
}
