import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { CreateRepositoryDto } from './dto/create-repository.dto';
import { RepositoryService } from './repository.service';

@Controller('repository')
export class RepositoryController {
    constructor(private service: RepositoryService) {}

    @MessagePattern('repository.create')
    async createRepository(@Payload() dto: CreateRepositoryDto) {
        return await this.service.createRepository(dto);
    }
}
