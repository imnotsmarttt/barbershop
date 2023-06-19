import {Controller, Get, Param} from '@nestjs/common';
import {RankService} from "../services/rank.service";

@Controller('rank')
export class RankController {
    constructor(
        private readonly rankService: RankService
    ) {}

    @Get('id')
    async findOne(@Param('id') id: number) {
        return await this.rankService.findOne({id})
    }
}
