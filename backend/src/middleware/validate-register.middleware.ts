import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { REGISTER_WHITELIST_KEYS } from 'src/constants/entities/auth';
import { checkBlacklistedKeyInPayload } from 'src/utils/validations';

@Injectable()
export class ValidateRegisterMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const { name, email, password } = req.body || {};

        const missingFields: string[] = [];

        if (!name) missingFields.push('name');
        if (!email) missingFields.push('email');
        if (!password) missingFields.push('password');

        if (missingFields.length > 0) {
            return res.status(400).json({
                statusCode: 400,
                message: 'Missing required fields',
                missingFields,
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) {
            return res.status(400).json({
                statusCode: 400,
                message: 'Invalid email format'
            });
        }

        if (typeof password !== 'string' || password?.toString()?.trim()?.length < 6) {
            return res.status(400).json({
                statusCode: 400,
                message: 'Password must be at least 6 characters long'
            });
        }

        const invalidKeys = checkBlacklistedKeyInPayload(Object.keys(req.body || {}), REGISTER_WHITELIST_KEYS);
        if (invalidKeys?.length) {
            return res.status(400).json({
                statusCode: 400,
                message: 'Invalid fields passed',
                allowedFields: REGISTER_WHITELIST_KEYS,
            });
        }

        next();
    }
}