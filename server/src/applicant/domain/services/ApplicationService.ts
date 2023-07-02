import {Type} from '@nestjs/common';
import {CrudService} from '@steroidsjs/nest/src/usecases/services/CrudService';
import {SearchResultDto} from '@steroidsjs/nest/src/usecases/dtos/SearchResultDto';
import SearchQuery from '@steroidsjs/nest/src/usecases/base/SearchQuery';
import {ApplicationModel} from '../models/ApplicationModel';
import {ApplicationSearchDto} from '../dtos/ApplicationSearchDto';
import {ApplicationSaveDto} from '../dtos/ApplicationSaveDto';
import {IApplicationRepository} from '../interfaces/IApplicationRepository';
import {ContextDto} from '../../../auth/domain/dtos/ContextDto';

export class ApplicationService extends CrudService<ApplicationModel,
    ApplicationSearchDto,
    ApplicationSaveDto | ApplicationModel> {
    protected modelClass = ApplicationModel;

    constructor(
        /** ApplicantRepository */
        public repository: IApplicationRepository,
    ) {
        super();
    }

    async search(dto: ApplicationSearchDto, context?: ContextDto | null): Promise<SearchResultDto<ApplicationModel>>

    async search<TSchema>(
        dto: ApplicationSearchDto,
        context?: ContextDto | null,
        schemaClass?: Type<TSchema>
    ): Promise<SearchResultDto<Type<TSchema>>>

    async search<TSchema>(
        dto: ApplicationSearchDto,
        context: ContextDto = null,
        schemaClass: Type<TSchema> = null,
    ): Promise<SearchResultDto<ApplicationModel | Type<TSchema>>> {
        await this.validate(dto, {
            context,
        });

        const searchQuery = schemaClass
            ? SearchQuery.createFromSchema(schemaClass, true)
            : new SearchQuery(this.repository, true);

        [
            'isDone',
            'applicantId',
            'operatorId',
        ].forEach(key => {
            if (dto[key]) {
                searchQuery.andFilterWhere({[key]: dto[key]});
            }
        });

        const result = await this.repository.search<TSchema>(
            dto,
            searchQuery,
        );

        if (schemaClass) {
            result.items = result.items.map(
                (model: ApplicationModel) => this.modelToSchema<TSchema>(model, schemaClass),
            );
        }
        return result;
    }
}
