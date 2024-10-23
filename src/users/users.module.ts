import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './infrastructure/entities/user.entity';
import { UsersRepositoryImpl } from './infrastructure/repositories/users.repository.impl';
import { UserRepository } from './infrastructure/repositories/users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: UserRepository,
      useClass: UsersRepositoryImpl,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
