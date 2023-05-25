import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateOrUpdateRankDto, FindOneRankDto} from "./rank.dto";
import {Repository} from "typeorm";
import {Rank} from "./rank.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class RankService {
    constructor(
        @InjectRepository(Rank)
        private readonly rankRepository: Repository<Rank>
    ) {}

    async create(data: CreateOrUpdateRankDto): Promise<Rank> {
        const createdRank = await this.rankRepository.create({...data})
        await this.rankRepository.save(createdRank)
        return createdRank
    }

    async update(id: number, data: CreateOrUpdateRankDto): Promise<Rank> {
        const rank = await this.findOne({id})

        for (const [key, value] of Object.entries(data)) {
            rank[key] = value
        }

        await this.rankRepository.save(rank)
        return rank
    }

    async delete(id: number) {
        const deleteResult = await this.rankRepository.createQueryBuilder('rank')
            .delete()
            .where('id = :id', {id})
            .execute()
        if (deleteResult.affected === 0) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND)
        }
    }

    async findOne(query: FindOneRankDto): Promise<Rank> {
        const rank = await this.rankRepository.findOneBy(query)
        if (!rank) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND)
        }
        return rank
    }
}
