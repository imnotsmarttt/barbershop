import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {Branch} from "./branch.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateOrUpdateBranchDto, FindAllBranchResultDto} from "./branch.dto";
import {FindOneQueryDto} from "../config/general.dto";

@Injectable()
export class BranchService {
    constructor(
        @InjectRepository(Branch)
        private readonly branchRepository: Repository<Branch>
    ) {
    }

    async create(data: CreateOrUpdateBranchDto): Promise<Branch> {
        const createdBranch = await this.branchRepository.create({...data})
        await this.branchRepository.save(createdBranch)
        return createdBranch
    }

    async deleteOne(id: number) {
        const deleteResult = await this.branchRepository.createQueryBuilder('branch')
            .delete()
            .where('id = :id', {id})
            .execute()
        if (deleteResult.affected === 0) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND)
        }
    }

    async findOne(query: FindOneQueryDto): Promise<Branch> {
        const branch = await this.branchRepository.findOneBy(query)
        if (!branch) {
            throw new HttpException('Філіал не знайдено', HttpStatus.NOT_FOUND) // branch not found
        }
        return branch
    }

    async update(id: number, data: CreateOrUpdateBranchDto): Promise<Branch> {
        const branch = await this.findOne({id})

        for (const [key, value] of Object.entries(data)) {
            branch[key] = value
        }
        await this.branchRepository.save(branch)
        return branch
    }

    async findAll(query): Promise<FindAllBranchResultDto> {
        const page: number = query.page || 1
        const take: number = query.take || 10
        const skip: number = (page - 1) * take

        const branchQueryBuilder = await this.branchRepository.createQueryBuilder('branch')
            .skip(skip)
            .take(take)
            .getManyAndCount()

        const [branchList, itemCount] = branchQueryBuilder

        return  {
            branchList,
            itemCount,
            pageSize: take
        }
    }
}
