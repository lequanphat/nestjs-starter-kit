<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">NestJS Starter Kit is based on Hexagonal Architecture</p>
    <p align="center">

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Features

- [x] Database. Support [TypeORM](https://www.npmjs.com/package/typeorm).
- [x] Migration and Seeding.
- [x] Config Service ([@nestjs/config](https://www.npmjs.com/package/@nestjs/config)).
- [x] Mailing ([nodemailer](https://www.npmjs.com/package/nodemailer)).
- [x] Sign in and sign up via email.
- [x] Admin and User roles.
- [x] Internationalization/Translations (I18N) ([nestjs-i18n](https://www.npmjs.com/package/nestjs-i18n)).
- [x] Swagger.

## Project setup

```bash
$ yarn install
```

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn dev

# production mode
$ yarn run start:prod
```

## Hexagonal Architecture

![Hexagonal Architecture Diagram](https://www.happycoders.eu/wp-content/uploads/2023/01/hexagonal-architecture-ddd-domain-driven-design-600x484.png)

## Description of the module structure

```txt
.
├── domain/
│   └── [DOMAIN].ts
├── dto/
│   ├── create.dto.ts
│   ├── update.dto.ts
│   └── get-all.dto.ts
├── infrastructure/
│   ├── entities/
│   │   └── [ENTITY].ts
│   ├── mappers/
│   │   └── [MAPPER].ts
│   └── repositories/
│       ├── [ADAPTER].repository.impl.ts
│       └── [PORT].repository.ts
├── controller.ts
├── module.ts
└── service.ts
```

`[DOMAIN].ts` represents an entity used in the business logic. Domain entity has no dependencies on the database or any other infrastructure.

`[ENTITY].ts` represents the **database structure**. It is used in the relational database.

`[MAPPER].ts` is a mapper that converts **database entity** to **domain entity** and vice versa.

`[PORT].repository.ts` is a repository **port** that defines the methods for interacting with the database.

`[ADAPTER].repository.impl.ts` is a repository that implements the `[PORT].repository.ts`. It is used to interact with the database.

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
