import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {Employee} from "./employee.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateOrUpdateEmployeeDto, EmployeeDto} from "./employee.dto";
import {BranchService} from "../branch/branch.service";
import {RankService} from "../rank/rank.service";
import {UsersService} from "../users/users.service";
import {FindOneQueryDto} from "../config/general.dto";
import {unlink} from "fs/promises";

@Injectable()
export class EmployeeService {
    constructor(
        @InjectRepository(Employee)
        private readonly employeeRepository: Repository<Employee>,
        private readonly branchService: BranchService,
        private readonly rankService: RankService,
        private readonly usersService: UsersService
    ) {
    }

    async create(data: CreateOrUpdateEmployeeDto, photo: Express.Multer.File | undefined): Promise<EmployeeDto> {
        const {
            firstName, lastName,
            phoneNumber, email,
            hiredFrom,
            branchId, rankId, userId
        } = data
        const empBranch = await this.branchService.findOne({id: branchId})
        const empRank = await this.rankService.findOne({id: rankId})
        const empUser = await this.usersService.findOne({id: userId})

        const createdEmployee = await this.employeeRepository.create({
            firstName, lastName,
            phoneNumber, email,
            hiredFrom,
            branch: empBranch,
            rank: empRank,
            user: empUser,
        })
        if (photo) {
            createdEmployee.photoUrl = photo.filename
        }
        createdEmployee.firedFrom = null
        await this.employeeRepository.save(createdEmployee)

        const {user, ...response} = createdEmployee
        return response
    }

    async findOne(query: FindOneQueryDto): Promise<Employee> {
        const employee = await this.employeeRepository.findOne({
            where: query,
            relations: ['rank', 'branch']
        })
        if (!employee) {
            throw new HttpException('Працівника не знайдено', HttpStatus.NOT_FOUND) // employee not found
        }
        return employee
    }

    async delete(id: number) {
        const deleteResult = await this.employeeRepository.createQueryBuilder('employee')
            .delete()
            .where('id - :id', {id})
            .execute()
        if (deleteResult.affected === 0) {
            throw new HttpException('Працівника не знайдено', HttpStatus.NOT_FOUND) // employee not found
        }
    }

    async update(id: number, data: CreateOrUpdateEmployeeDto, photo: Express.Multer.File | undefined) {
        const {branchId, rankId, ...fields} = data
        const employee = await this.findOne({id})

        if (branchId) {
            employee.branch = await this.branchService.findOne({id: branchId})
        }

        if (rankId) {
            employee.rank = await this.rankService.findOne({id: rankId})
        }

        for (const [key, value] of Object.entries(fields)) {
            if (employee[key] !== value) {
                employee[key] = value
            }
        }
        if (photo) {
            await unlink(`./files/employee/avatar/${employee.photoUrl}`)
            employee.photoUrl = photo.filename
        }

        await this.employeeRepository.save(employee)
        return employee
    }
}
