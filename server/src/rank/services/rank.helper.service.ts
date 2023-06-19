import {Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {Rank} from "rank/rank.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class RankHelperService {
    constructor(
        @InjectRepository(Rank)
        private readonly rankRepository: Repository<Rank>
    ) {}

    async isExist(rank: string) {
        const isExist = await this.rankRepository.findOneBy({rank})
        return !!isExist
    }
}
