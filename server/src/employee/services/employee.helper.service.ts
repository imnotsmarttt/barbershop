import {forwardRef, Inject, Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {Employee} from "employee/employee.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {EmployeeFreeTimeInterface} from "employee/interfaces/employee.interface";
import {VisitsService} from "visits/services/visits.service";
import {Visit} from "visits/visit.entity";
import {ServicesService} from "services/services/services.service";
import {CommonService} from "common/common.service";
import {ServiceWithRankInterface} from "../../services/interfaces/service.interface";

@Injectable()
export class EmployeeHelperService {
    constructor(
        @InjectRepository(Employee)
        private readonly employeeRepository: Repository<Employee>,
        private readonly servicesService: ServicesService,
        private readonly commonService: CommonService,
        @Inject(forwardRef(() => VisitsService))
        private readonly visitsService: VisitsService
    ) {
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
    async getAvailableServicesByTime(employeeVisits: Visit[], time: string, openAt: string, closeAt: string, employeeRankId: number): Promise<ServiceWithRankInterface[]> {
        const nextVisitDate: string | undefined = employeeVisits.filter((visit) => {
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
    async getVisits(id: number, date: string): Promise<EmployeeFreeTimeInterface[]> {
        const employeeVisits = await this.visitsService.getAllVisitsByDate(id, date)
        const employee = await this.employeeRepository.findOne({
            where: {id},
            relations: ['branch', 'rank']
        })
        const response: EmployeeFreeTimeInterface[] = []
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
