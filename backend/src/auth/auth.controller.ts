import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';

interface User {
    id: number;
    username: String;
    password: String;
}

@Controller('auth')
export class AuthController {
    private userStore: User[] =[]
    private UserIdCounter = 1
    constructor(private readonly authService: AuthService) {}

    //se valida si expiste el usuario en userStore
    @Post('register')
    async register(@Body() authDto: AuthDto) {
        const existingUser = this.userStore.find(user => user.username === authDto.username)
        if(existingUser) {
            return {message: 'El usuario ya esta registrado'}
        }

        //se crea y se guarda en usuario
        const hashedPassword = await this.authService.hashPassword(authDto.password)
        const newUser: User = {
            id: this.UserIdCounter++,
            username: authDto.username,
            password: hashedPassword
        }

        this.userStore.push(newUser)
        return {message: 'Usuario registrado correctamente'}
    }


    @Post('login')
    async login(@Body() AuthDto: AuthDto) {
        //se busca al usuario y se verifica la constraseña
        const user = this.userStore.find(user => user.username === AuthDto.username)
        if(!user) {
            throw new UnauthorizedException('Usuario no encontrado')
        }

        //se genera el token de JWT

        const token = await this.authService.generateToken(user.id)
        return {access_token: token}
    }

}
