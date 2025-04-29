import { Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';


@Controller('api/v1/entry')
export class EntryController {
    constructor() { }

    @Post('register')
    register() {

        return "hello"
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    login() {
        return "hello"
    }
}
