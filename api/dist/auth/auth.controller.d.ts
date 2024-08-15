import { AuthService } from './auth.service';
import { AuthRegisterDto, AuthLoginDto } from './dto';
import { Tokens } from './types';
import { Request } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(dto: AuthRegisterDto): Promise<Tokens>;
    login(dto: AuthLoginDto): Promise<{
        token: string;
        user: {
            id: number;
            email: string;
            firstName: string;
            lastName: string;
            phone: string | null;
            hash: string;
            hashedRt: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    logout(req: Request): Promise<void>;
    refreshTokens(req: Request): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
}
