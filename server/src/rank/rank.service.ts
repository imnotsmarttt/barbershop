import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateOrUpdateRankDto} from "./rank.dto";
import {Repository} from "typeorm";
import {Rank} from "./rank.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {FindOneQueryDto} from "../config/general.dto";

@Injectable()
export class RankService {
    constructor(
        @InjectRepository(Rank)
        private readonly rankRepository: Repository<Rank>
    ) {}

    async isExist(rank: string) {
        const isExist = await this.rankRepository.findOneBy({rank})
        return !!isExist
    }

    async create(data: CreateOrUpdateRankDto): Promise<Rank> {
        const isExist = await this.isExist(data.rank)
        if (isExist) {
            throw new HttpException('Rank is already exist', HttpStatus.CONFLICT)
        }
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
            throw new HttpException('Rank not found', HttpStatus.NOT_FOUND)
        }
    }

    async findOne(query: FindOneQueryDto): Promise<Rank> {
        const rank = await this.rankRepository.findOneBy(query)
        if (!rank) {
            throw new HttpException('Посаду не знайдено', HttpStatus.NOT_FOUND) // rank not found
        }
        return rank
    }
}
