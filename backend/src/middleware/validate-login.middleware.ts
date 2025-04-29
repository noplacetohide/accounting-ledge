
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LOGIN_WHITELIST_KEYS } from 'src/constants/entities/auth';
import { checkBlacklistedKeyInPayload } from 'src/utils/validations';

@Injectable()
export class ValidateLoginMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body || {};

        const missingFields: string[] = [];

        if (!email) missingFields.push('email');
        if (!password) missingFields.push('password');

        if (missingFields.length > 0) {
            return res.status(400).json({
                statusCode: 400,
                message: 'Missing required fields',
                missingFields,
            });
        }
        const invalidKeys = checkBlacklistedKeyInPayload(Object.keys(req.body || {}), LOGIN_WHITELIST_KEYS);
        if (invalidKeys?.length) {
            return res.status(400).json({
                statusCode: 400,
                message: 'Invalid fields passed',
                allowedFields: LOGIN_WHITELIST_KEYS,
            });
        }
        next();
    }
}