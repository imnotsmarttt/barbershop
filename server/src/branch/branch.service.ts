import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {Branch} from "./branch.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateBranchDto, FindOneBranchDto, UpdateBranchDto} from "./branch.dto";

@Injectable()
export class BranchService {
    constructor(
        @InjectRepository(Branch)
        private readonly branchRepository: Repository<Branch>
    ) {}

    async create(data: CreateBranchDto): Promise<Branch> {
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

    async getOne(query: FindOneBranchDto): Promise<Branch> {
        const branch = await this.branchRepository.findOneBy(query)
        if (!branch) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND)
        }
        return branch
    }

    async update(id: number, data: UpdateBranchDto ): Promise<Branch> {
        const branch = await this.getOne({id})

        for (const [key, value] of Object.entries(data)) {
            branch[key] = value
        }
        await this.branchRepository.save(branch)
        return branch
    }
}
