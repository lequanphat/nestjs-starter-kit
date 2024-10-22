import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthRegisterDto } from './dto/user-register.dto';
import { ConfigService } from '@nestjs/config';
import { RoleEnum } from '../roles/roles.enum';
import { UsersService } from '../users/users.service';
import { MailService } from '../mail/mail.service';
import { AllConfigType } from '../config/config.type';
import { AuthConfig } from './config/auth-config.type';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private mailService: MailService,
    private configService: ConfigService<AllConfigType>,
  ) {}

  async register(dto: AuthRegisterDto): Promise<void> {
    const user = await this.usersService.create({
      ...dto,
      email: dto.email,
      role: {
        id: RoleEnum.USER,
      },
    });

    const hash = await this.jwtService.signAsync(
      {
        confirmEmailUserId: user.id,
      },
      {
        secret: this.configService.getOrThrow<keyof AuthConfig>(
          'auth.confirmEmailSecret',
          {
            infer: true,
          },
        ),
        expiresIn: this.configService.getOrThrow<keyof AuthConfig>(
          'auth.confirmEmailExpires',
          {
            infer: true,
          },
        ),
      },
    );

    await this.mailService.userSignUp({
      to: dto.email,
      data: {
        hash,
      },
    });
  }
}
