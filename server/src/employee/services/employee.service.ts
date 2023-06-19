import {forwardRef, HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {Employee} from "../employee.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateOrUpdateEmployeeDto} from "employee/interfaces/employee.dto";
import {EmployeeInterface, FindAllEmployeeResult} from "employee/interfaces/employee.interface";
import {BranchService} from "branch/services/branch.service";
import {RankService} from "rank/services/rank.service";
import {UsersService} from "users/services/users.service";
import {FindOneQueryDto} from "common/common.dto";
import {unlink} from "fs/promises";
import {VisitsService} from "visits/services/visits.service";
import {ServicesService} from "services/services/services.service";
import {CommonService} from "common/common.service";

@Injectable()
export class EmployeeService {
    constructor(
        @InjectRepository(Employee)
        private readonly employeeRepository: Repository<Employee>,
        private readonly branchService: BranchService,
        private readonly rankService: RankService,
        private readonly usersService: UsersService,
        private readonly servicesService: ServicesService,
        private readonly commonService: CommonService,
        @Inject(forwardRef(() => VisitsService))
        private readonly visitsService: VisitsService
    ) {
    }

    async create(data: CreateOrUpdateEmployeeDto, photo: Express.Multer.File | undefined): Promise<EmployeeInterface> {
        const {
            firstName, lastName,
            phoneNumber, email,
            hiredFrom,
            branchId, rankId, userId
        } = data
        const empBranch = await this.branchService.findOne({id: branchId})
        const empRank = await this.rankService.findOne({id: rankId})
        const empUser = await this.usersService.findOneWithError({id: userId})

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
            .where('employee.id = :id', {id})
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

    async findAll(query): Promise<FindAllEmployeeResult> {
        const page: number = query.page || 1
        const take: number = query.take || 10
        const skip: number = (page - 1) * take

        const employeeQueryBuilder = await this.employeeRepository.createQueryBuilder('employee')
            .leftJoinAndSelect('employee.rank', 'rank')
            .leftJoinAndSelect('employee.branch', 'branch')
            .skip(skip)
            .take(take)
            .getManyAndCount()

        const [employeeList, itemCount] = employeeQueryBuilder

        return {
            employeeList,
            itemCount,
            pageSize: take
        }
    }
}
