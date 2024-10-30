import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {
    
    constructor(private jwService: JwtService) {}

    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10)
    }

    async validatePassword(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword)
    }

    async generateToken(userId: number): Promise<string> {
        return this.jwService.sign({userId})
    }

}
