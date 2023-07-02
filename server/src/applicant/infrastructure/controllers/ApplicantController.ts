import {Controller, Get, Param, ParseIntPipe, Query, Post, Delete, Body, Put} from '@nestjs/common';
import {ApiBody, ApiOkResponse, ApiQuery, ApiTags} from '@nestjs/swagger';
import {ApplicantService} from '../../domain/services/ApplicantService';
import {ApplicantSearchDto} from '../../domain/dtos/ApplicantSearchDto';
import {ApplicantSaveDto} from '../../domain/dtos/ApplicantSaveDto';
import {ApplicantSchema} from '../schemas/ApplicantSchema';

@Controller('/applicant')
@ApiTags('Заявитель о помощи')
export class ApplicantController {
    constructor(
        private service: ApplicantService,
    ) {
    }

    @Get()
    @ApiQuery({type: ApplicantSearchDto})
    @ApiOkResponse({type: ApplicantSchema, isArray: true})
    async search(
        @Query() dto: ApplicantSearchDto,
    ) {
        return this.service.search(dto, null, ApplicantSchema);
    }

    @Get('/:id')
    @ApiOkResponse({type: ApplicantSchema, isArray: false})
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return this.service.findById(id, null, ApplicantSchema);
    }

    @Post()
    @ApiBody({type: ApplicantSaveDto})
    @ApiOkResponse({type: ApplicantSchema, isArray: false})
    async create(
        @Body() dto: ApplicantSaveDto,
    ) {
        return this.service.create(dto, null, ApplicantSchema);
    }

    @Put('/:id')
    @ApiBody({type: ApplicantSaveDto})
    @ApiOkResponse({type: ApplicantSchema, isArray: false})
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: ApplicantSaveDto,
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
