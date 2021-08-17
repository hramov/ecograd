import { IsNumber } from "class-validator"

export class AddRoleDto {

    @IsNumber({}, { message: 'Should be an integer'})
    readonly roleid: number

    @IsNumber({}, { message: 'Should be an integer'})
    readonly userid: number
}