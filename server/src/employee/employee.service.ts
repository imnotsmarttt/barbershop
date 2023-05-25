import {Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {Employee} from "./employee.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class EmployeeService {
    constructor(
        @InjectRepository(Employee)
        private readonly employeeRepository: Repository<Employee>
    ) {}

    async create() {

    }

    async findOne() {

    }

    async delete() {

    }

    async update() {

    }
}
