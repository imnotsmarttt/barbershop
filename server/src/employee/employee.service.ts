import {forwardRef, HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {Employee} from "./employee.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateOrUpdateEmployeeDto, EmployeeDto, EmployeeFreeTime} from "./employee.dto";
import {BranchService} from "../branch/branch.service";
import {RankService} from "../rank/rank.service";
import {UsersService} from "../users/users.service";
import {FindOneQueryDto} from "../config/general.dto";
import {unlink} from "fs/promises";
import {VisitsService} from "../visits/visits.service";
import {Visit} from "../visits/visit.entity";
import {ServicesService} from "../services/services.service";
import {ServiceWithRankDto} from "../services/services.dto";
import {CommonService} from "../common/common.service";

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


    async create(data: CreateOrUpdateEmployeeDto, photo: Express.Multer.File | undefined): Promise<EmployeeDto> {
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

    // check if employee has visit
    async isBusy(visits: Visit[], visitTime: string, serviceDuration = 30): Promise<false | string> {
        const shiftTimeString = this.commonService.incrementTime(visitTime, serviceDuration)

        for (const visit of visits) {
            const startTime = this.commonService.getTimeFromDatetime(visit.startDate)
            const endTime = this.commonService.getTimeFromDatetime(visit.endDate)


            if (visitTime >= startTime && visitTime <= endTime || shiftTimeString >= startTime && shiftTimeString <= endTime) {
                return endTime // return next free time if employee busy
            }
        }
        return false // return false if employee free
    }

    // returns received time if employee free or create new if busy
    async checkEmployeeTime(employeeVisits: Visit[], time: string): Promise<string> {
        const minVisitTime = 30
        const shiftTimeString = this.commonService.incrementTime(time, minVisitTime)

        // check if employee busy at this time
        const isEmployeeBusy = await this.isBusy(employeeVisits, time)
        if (isEmployeeBusy) {
            return this.commonService.incrementTime(isEmployeeBusy, 15) // return new time if employee busy at this time
        }
        return time // return received time if employee free
    }

    // returns an array of utils which going to end before next visit going to start
    async getAvailableServicesByTime(employeeVisits: Visit[], time: string, openAt: string, closeAt: string, employeeRankId: number): Promise<ServiceWithRankDto[]> {
        const nextVisitDate: string | undefined  = employeeVisits.filter((visit) => {
            if (visit.startDate) {
                const visitStartString = this.commonService.getTimeFromDatetime(visit.startDate)
                return time < visitStartString
            }

        })[0]?.startDate


        const nextVisitTime: string = nextVisitDate ? this.commonService.getTimeFromDatetime(nextVisitDate) : closeAt

        const employeeServices = await this.servicesService.findAllByRankId(employeeRankId)

        return employeeServices.filter(service => {
            const serviceEndTime = this.commonService.incrementTime(time, service.durationMin)
            return serviceEndTime < nextVisitTime && (serviceEndTime > openAt && serviceEndTime < closeAt)
        })
    }

    // get visits & available utils by free time of employee
    async getVisits(id: number, date: string): Promise<EmployeeFreeTime[]> {
        const employeeVisits = await this.visitsService.getAllVisitsByDate(id, date)
        const employee = await this.employeeRepository.findOne({
            where: {id},
            relations: ['branch', 'rank']
        })
        const response: EmployeeFreeTime[] = []
        let openAt = employee.branch.openAt // get start time
        let closeAt = employee.branch.closeAt // get end time

        const newDateShift = 40
        while (openAt < closeAt) {
            const start = await this.checkEmployeeTime(employeeVisits, openAt) // return received or changed time
            const availableServices = await this.getAvailableServicesByTime(employeeVisits, start, employee.branch.openAt, closeAt, employee.rank.id)
            if (availableServices.length) {
                response.push({start, availableServices})
            }
            openAt = this.commonService.incrementTime(start, newDateShift) // set time for next iteration
        }

        return response
    }
}
