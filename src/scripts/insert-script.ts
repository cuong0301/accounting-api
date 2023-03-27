import { createConnection, DataSourceOptions } from 'typeorm';
import { AccountEntity } from '../accounts/account.entity';
import { ormConfig } from '../config/ormconfig';
import { readFileExcel } from './readFileExcel';

const fileName = process.argv[2];

export const insertData = async () => {
  try {
    const dataExcel = readFileExcel(fileName, 5, 5);
    const newData = [];
    dataExcel.map((item) => {
      const x = {
        code: item['111'],
        vietnameseName: item['Tiền mặt'],
        englishName: item['Cash'],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      newData.push(x);
    });
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
