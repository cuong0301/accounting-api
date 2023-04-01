import { DataSource } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AccountEntity } from '../../src/accounts/account.entity';

describe('AccountEntity', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule(
      {},
    ).compile();

    app = moduleFixture.createNestApplication();
    dataSource = app.get(DataSource);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('getAccounts', () => {
    it('should return accounts with code: 111 and vietnameseName: "Tiền mặt" and englishName: "Cash"', async () => {
      const accounts = await dataSource.getRepository(AccountEntity).find({
        where: {
          code: 111,
          vietnameseName: 'Tiền mặt',
          englishName: 'Cash',
        },
      });

      expect(accounts).toEqual([
        {
          code: 111,
          vietnameseName: 'Tiền mặt',
          englishName: 'Cash',
          createdAt: new Date('2022-01-11T18:30:00.000Z'),
          updatedAt: new Date('2022-01-11T18:30:00.000Z'),
        },
      ]);
    });
  });
});
