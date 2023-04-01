import { createConnection, DataSourceOptions } from 'typeorm';
import { AccountEntity } from '../src/accounts/account.entity';
import { ormConfig } from '../src/config/ormconfig';
import { readFileExcel } from './read-file-excel';
import { Logger } from '../src/helpers/services/logger.service';

const logger = new Logger();
const fileName = process.argv[2];

export const insertData = async () => {
  try {
    const dataExcel = readFileExcel(fileName, 0, 2);
    const newData = dataExcel.map((item) => {
      const account = {
        code: item['Tài khoản'],
        vietnameseName: item['Tên tài khoản'],
        englishName: item['Account name'],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return account;
    });
    const connection = await createConnection(ormConfig as DataSourceOptions);
    const accountRepository = connection.getRepository(AccountEntity);
    await accountRepository.save(newData);
  } catch (error) {
    logger.error({ message: error.message });
  }
};

insertData();
