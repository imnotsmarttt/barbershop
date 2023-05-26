import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Visit} from "./visit.entity";
import {Repository} from "typeorm";
import {CreateOrUpdateVisitDto} from "./visit.dto";
import {EmployeeService} from "../employee/employee.service";
import {ServicesService} from "../services/services.service";
import {FindOneQueryDto} from "../config/general.dto";
import {Service} from "../services/services.entity";

@Injectable()
export class VisitsService {
    constructor(
        @InjectRepository(Visit)
        private readonly visitRepository: Repository<Visit>,

        private readonly employeeService: EmployeeService,
        private readonly servicesService: ServicesService
    ) {}

    getVisitEndDate(startDate: Date, service: Service) {
        const start = new Date(startDate)
        start.setMinutes(start.getMinutes() + service.durationMin)
        const endDate = start.toISOString()

        return endDate
    }

    async create(data: CreateOrUpdateVisitDto): Promise<Visit> {
        const {fullName, phoneNumber, email, startDate, serviceId, employeeId} = data
        const employee = await this.employeeService.findOne({id: employeeId})
        const service = await this.servicesService.findOne({id: serviceId})

        const endDate = this.getVisitEndDate(startDate, service)

        const visit = await this.visitRepository.create({
            fullName, phoneNumber, email, startDate, endDate, service, employee
        })

        await this.visitRepository.save(visit)
        return visit
    }



    async update(id: number, data: CreateOrUpdateVisitDto): Promise<Visit> {
        const {startDate, serviceId, employeeId, ...fields} = data
        const visit = await this.findOne({id})

        const service = await this.servicesService.findOne({id: serviceId})
        for (const [key, value] of Object.entries(fields)) {
            if (visit[key] !== value) {
                visit[key] = value
            }
        }
        if (visit.service.id !== serviceId) {
            visit.service = service
        }
        if (visit.employee.id !== employeeId) {
            visit.employee = await this.employeeService.findOne({id: serviceId})
        }
        if (visit.startDate.toISOString() !== new Date(startDate).toISOString()) {
            visit.startDate = startDate
            visit.endDate = new Date(this.getVisitEndDate(startDate, service))
        }

        await this.visitRepository.save(visit)
        return visit
    }

    async delete(id: number) {
        const deleteResult = await this.visitRepository.createQueryBuilder('visit')
            .delete()
            .where('id = :id', {id})
            .execute()
        if (deleteResult.affected === 0 ) {
            throw new HttpException('Запис не знайдено', HttpStatus.NOT_FOUND) // visit not found
        }
    }

    async findOne(query: FindOneQueryDto): Promise<Visit> {
        const visit = await this.visitRepository.findOne({
            where: query,
            relations: ['employee', 'service']
        })
        if (!visit) {
            throw new HttpException('Запис не знайдено', HttpStatus.NOT_FOUND) // visit not found
        }
        return visit
    }
}
