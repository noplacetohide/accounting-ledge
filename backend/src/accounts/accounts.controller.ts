import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AccountsService } from './account.service';

@Controller('api/v1/users')
export class AccountsController {
    constructor(private accountsService: AccountsService) { }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return {
            message: 'Access granted to protected resource',
            user: {
                id: req.user.id,
                email: req.user.email,
                role: req.user.role,
            }
        };
    }
}