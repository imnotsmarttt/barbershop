import {Controller, Get, UseGuards} from '@nestjs/common';
import {RolesGuard} from "../role/roles.guard";
import {Roles} from "../role/role.decorator";
import {RoleEnum} from "../role/roles.enum";

@Controller('admin')
@UseGuards(RolesGuard)
export class AdminController {

    @Roles(RoleEnum.admin)
    @Get()
    async hello() {
        return 'hello'
    }
}
