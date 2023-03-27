import { Test, TestingModule } from '@nestjs/testing';
import { HttpAdapterHost } from '@nestjs/core';
import {
  INestApplication,
  Module,
  Controller,
  Post,
  BadRequestException,
} from '@nestjs/common';
import * as request from 'supertest';
import { RouterModule } from 'nest-router';
import { AllExceptionsFilter } from '../errors/exception-filter';
import { ApiError } from './exceptions';

describe('AllExceptionsFilter', () => {
  let testModule: TestingModule;
  let app: INestApplication;

  let handler: any;

  beforeEach(async () => {
    @Controller()
    class FakeController {
      @Post()
      async fake() {
        await handler();
      }
    }

    @Module({
      controllers: [FakeController],
    })
    class FakeModule {}

    testModule = await Test.createTestingModule({
      imports: [
        FakeModule,
        RouterModule.forRoutes([
          {
            path: '/fake',
            module: FakeModule,
          },
        ]),
      ],
      controllers: [FakeController],
    }).compile();

    app = testModule.createNestApplication();
    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
    await app.init();
  });

  it('transform a Nest HttpException to ApiError', async () => {
    handler = async () => {
      throw new ApiError('TOKEN_INVALID');
    };

    const res = await request(app.getHttpServer())
      .post('/fake')
      .send()
      .expect(401);

    expect(res.body).toEqual({
      code: 'TOKEN_INVALID',
      status: 401,
    });
  });

  it('transform a Nest HttpException to ApiError', async () => {
    handler = async () => {
      throw new BadRequestException('this is wrong!');
    };

    const res = await request(app.getHttpServer())
      .post('/fake')
      .send()
      .expect(400);

    expect(res.body).toEqual({
      code: 'BAD_REQUEST',
      status: 400,
      message: 'this is wrong!',
    });
  });

  it('transform a regular exception to ApiError', async () => {
    handler = async () => {
      throw new Error('woe is me, what happened?');
    };

    const res = await request(app.getHttpServer())
      .post('/fake')
      .send()
      .expect(500);

    expect(res.body).toMatchObject({
      code: 'INTERNAL_SERVER_ERROR',
      status: 500,
    });
  });

  it('transform a non-exception to ApiError', async () => {
    handler = async () => {
      throw 'what am I even doing' as any; // eslint-disable-line no-throw-literal
    };

    const res = await request(app.getHttpServer())
      .post('/fake')
      .send()
      .expect(500);

    expect(res.body).toEqual({
      code: 'INTERNAL_SERVER_ERROR',
      status: 500,
    });
  });
});
