import { PrismaService } from 'src/prisma/prisma.service';
import { AuthLoginDto, AuthRegisterDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { Tokens } from './types';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
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
    logout(userId: number): Promise<void>;
    refreshTokens(userId: number, rt: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    hashData(data: string): Promise<string>;
    getTokens(userId: number, email: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    updateRtHash(userId: number, rt: string): Promise<void>;
}
