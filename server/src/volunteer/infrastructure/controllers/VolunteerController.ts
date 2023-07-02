import {Controller, Get, Param, ParseIntPipe, Query, Post, Delete, Body, Put} from '@nestjs/common';
import {ApiBody, ApiOkResponse, ApiQuery, ApiTags} from '@nestjs/swagger';
import {VolunteerService} from '../../domain/services/VolunteerService';
import {VolunteerSearchDto} from '../../domain/dtos/VolunteerSearchDto';
import {VolunteerSchema} from '../schemas/VolunteerSchema';
import {VolunteerSaveDto} from '../../domain/dtos/VolunteerSaveDto';

@Controller('/volunteer')
@ApiTags('Исполнители / волонтеры')
export class VolunteerController {
    constructor(
        private service: VolunteerService,
    ) {
    }

    @Get()
    @ApiQuery({type: VolunteerSearchDto})
    @ApiOkResponse({type: VolunteerSchema, isArray: true})
    async search(
        @Query() dto: VolunteerSearchDto,
    ) {
        return this.service.search(dto, null, VolunteerSchema);
    }

    @Get('/:id')
    @ApiOkResponse({type: VolunteerSchema, isArray: false})
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return this.service.findById(id, null, VolunteerSchema);
    }

    @Post()
    @ApiBody({type: VolunteerSaveDto})
    @ApiOkResponse({type: VolunteerSchema, isArray: false})
    async create(
        @Body() dto: VolunteerSaveDto,
    ) {
        return this.service.create(dto, null, VolunteerSchema);
    }

    @Put('/:id')
    @ApiBody({type: VolunteerSaveDto})
    @ApiOkResponse({type: VolunteerSchema, isArray: false})
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: VolunteerSaveDto,
    ) {
        return this.service.save(id, dto);
    }

    @Delete('/:id')
    async delete(
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.service.remove(id);
    }
}
