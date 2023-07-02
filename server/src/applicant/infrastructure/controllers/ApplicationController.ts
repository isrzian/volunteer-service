import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query} from '@nestjs/common';
import {ApiBody, ApiOkResponse, ApiQuery, ApiTags} from '@nestjs/swagger';
import {ApplicationService} from '../../domain/services/ApplicationService';
import {ApplicationSearchDto} from '../../domain/dtos/ApplicationSearchDto';
import {ApplicationSchema} from '../schemas/ApplicationSchema';
import {ApplicationSaveDto} from '../../domain/dtos/ApplicationSaveDto';

@Controller('/application')
@ApiTags('Заявки на помощь')
export class ApplicationController {
    constructor(
        private service: ApplicationService,
    ) {
    }

    @Get()
    @ApiQuery({type: ApplicationSearchDto})
    @ApiOkResponse({type: ApplicationSchema, isArray: true})
    async search(
        @Query() dto: ApplicationSearchDto,
    ) {
        return this.service.search(dto, null, ApplicationSchema);
    }

    @Get('/:id')
    @ApiOkResponse({type: ApplicationSchema, isArray: false})
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return this.service.findById(id, null, ApplicationSchema);
    }

    @Post()
    @ApiBody({type: ApplicationSaveDto})
    @ApiOkResponse({type: ApplicationSchema, isArray: false})
    async create(
        @Body() dto: ApplicationSaveDto,
    ) {
        return this.service.create(dto, null, ApplicationSchema);
    }

    @Put('/:id')
    @ApiBody({type: ApplicationSaveDto})
    @ApiOkResponse({type: ApplicationSchema, isArray: false})
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: ApplicationSaveDto,
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
