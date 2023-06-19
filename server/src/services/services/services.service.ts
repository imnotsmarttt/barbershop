import {HttpException, HttpStatus, Injectable} from '@nestjs/common';

import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Service} from "services/services.entity";

import {RankService} from "rank/services/rank.service";

import {CreateOrUpdateServicesDto} from "services/interfaces/services.dto";
import {FindAllServicesResultInterface} from "services/interfaces/service.interface";
import {FindOneQueryDto} from "common/common.dto";

import {unlink} from "fs/promises";

@Injectable()
export class ServicesService {
    constructor(
        @InjectRepository(Service)
        private readonly serviceRepository: Repository<Service>,
        private readonly rankService: RankService
    ) {
    }

    async findAll(query): Promise<FindAllServicesResultInterface> {
        const page: number = query.page || 1
        const take: number = query.take || 10
        const skip: number = (page - 1) * take

        const servicesQueryBuilder = await this.serviceRepository.createQueryBuilder('service')
            .leftJoinAndSelect('service.rank', 'rank')
            .take(take)
            .skip(skip)
            .getManyAndCount()

        const [serviceList, itemCount] = servicesQueryBuilder
        return {
            serviceList,
            itemCount,
            pageSize: take
        }
    }

    async create(data: CreateOrUpdateServicesDto, photo: Express.Multer.File | undefined): Promise<Service> {
        const {service, price, durationMin, rankId} = data

        const rank = await this.rankService.findOne({id: rankId})
        const createdService = await this.serviceRepository.create(
            {service, price, durationMin, rank}
        )

        if (photo) {
            createdService.photoUrl = photo.filename
        }

        await this.serviceRepository.save(createdService)
        return createdService
    }

    async update(id: number, data: CreateOrUpdateServicesDto, photo: Express.Multer.File | undefined): Promise<Service> {
        const {rankId, ...fields} = data
        const service = await this.findOne({id})

        service.rank = await this.rankService.findOne({id: rankId})
        for (const [key, value] of Object.entries(fields)) {
            if (service[key] !== value) {
                service[key] = value
            }
        }

        if (photo) {
            service.photoUrl && await unlink(`./files/services/${service.photoUrl}`)

            service.photoUrl = photo.filename
        }
        console.log(service)
        await this.serviceRepository.save(service)
        return service
    }

    async delete(id: number) {
        const deleteResult = await this.serviceRepository.createQueryBuilder('service')
            .delete()
            .where('id = :id', {id})
            .execute()
        if (deleteResult.affected === 0) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND)
        }
    }

    async findOne(query: FindOneQueryDto): Promise<Service> {
        const service = await this.serviceRepository.findOneBy(query)
        if (!service) {
            throw new HttpException('Послугу не знайдено', HttpStatus.NOT_FOUND) // service not found
        }
        return service
    }

    async findAllByRankId(rankId: number): Promise<Service[]> {
        return await this.serviceRepository.createQueryBuilder('service')
            .leftJoinAndSelect('service.rank', 'rank')
            .where('rank.id = :rankId', {rankId})
            .getMany()
    }
}
