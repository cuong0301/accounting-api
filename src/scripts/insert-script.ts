import { createConnection, DataSourceOptions } from 'typeorm';
import { AccountEntity } from '../accounts/account.entity';
import { ormConfig } from '../config/ormconfig';
import { readFileExcel } from './readFileExcel';

const fileName = process.argv[2];

export const insertData = async () => {
  try {
    const dataExcel = readFileExcel(fileName, 0, 2);
    const newData = [];
    dataExcel.map((item) => {
      const x = {
        code: item['Tài khoản'],
        vietnameseName: item['Tên tài khoản'],
        englishName: item['Account name'],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      newData.push(x);
    });
    console.log(newData[10]);
    const connection = await createConnection(ormConfig as DataSourceOptions);
    const accountRepository = connection.getRepository(AccountEntity);
    newData.map(async (account) => {
      await accountRepository.save(account);
    });
  } catch (error) {
    console.log(error);
  }
};

insertData();
