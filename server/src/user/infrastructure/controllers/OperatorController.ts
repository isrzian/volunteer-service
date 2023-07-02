import {Controller, Get, Param, ParseIntPipe, Query, Post, Delete, Body, Put} from '@nestjs/common';
import {ApiBody, ApiOkResponse, ApiQuery, ApiTags} from '@nestjs/swagger';
import {OperatorService} from '../../domain/services/OperatorService';
import {OperatorSearchDto} from '../../domain/dtos/OperatorSearchDto';
import {OperatorSchema} from '../schemas/OperatorSchema';
import {OperatorSaveDto} from '../../domain/dtos/OperatorSaveDto';

@Controller('/operator')
@ApiTags('Операторы')
export class OperatorController {
    constructor(
        private service: OperatorService,
    ) {
    }

    @Get()
    @ApiQuery({type: OperatorSearchDto})
    @ApiOkResponse({type: OperatorSchema, isArray: true})
    async search(
        @Query() dto: OperatorSearchDto,
    ) {
        return this.service.search(dto, null, OperatorSchema);
    }

    @Get('/:id')
    @ApiOkResponse({type: OperatorSchema, isArray: false})
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return this.service.findById(id, null, OperatorSchema);
    }

    @Post()
    @ApiBody({type: OperatorSaveDto})
    @ApiOkResponse({type: OperatorSchema, isArray: false})
    async create(
        @Body() dto: OperatorSaveDto,
    ) {
        return this.service.create(dto, null, OperatorSchema);
    }

    @Put('/:id')
    @ApiBody({type: OperatorSaveDto})
    @ApiOkResponse({type: OperatorSchema, isArray: false})
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: OperatorSaveDto,
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
