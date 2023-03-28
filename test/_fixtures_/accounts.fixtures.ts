import { AccountEntity } from '../../src/accounts/account.entity';

export const Accounts: AccountEntity[] = [
  {
    code: 111,
    vietnameseName: 'Tiền mặt',
    englishName: 'Cash',
    createdAt: new Date('2022-11-25T18:30:00.000Z'),
    updatedAt: new Date('2022-11-25T18:30:00.000Z'),
  },
  {
    code: 1111,
    vietnameseName: 'Tiền mặt Việt Nam',
    englishName: 'Vietnamese currency',
    createdAt: new Date('2022-11-25T18:30:00.000Z'),
    updatedAt: new Date('2022-11-25T18:30:00.000Z'),
  },
  {
    code: 1112,
    vietnameseName: 'Tiền mặt ngoại tệ',
    englishName: 'Foreign currency',
    createdAt: new Date('2022-11-25T18:30:00.000Z'),
    updatedAt: new Date('2022-11-25T18:30:00.000Z'),
  },
];
