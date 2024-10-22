import { NestFactory } from '@nestjs/core';
import { SeedModule } from './seed.module';
import { RoleSeedService } from './roles/role-seed.service';

const runSeed = async () => {
  const app = await NestFactory.create(SeedModule);

  await app.get(RoleSeedService).run();

  await app.close();
};

void runSeed();
