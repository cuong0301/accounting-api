import { readFileExcel } from '../../src/scripts/readFileExcel';
import * as path from 'path';
describe('readFileExcel', () => {
  it('should read file Excel correctly', () => {
    const data = readFileExcel(path.join(__dirname, './exampledata.xls'), 2, 2);
    expect(data).toEqual([
      {
        code: '1123',
        name_vi: 'Tiền gửi vàng bạc, đá quý',
        name_en: 'Gold, silver, gemstones',
      },
      {
        code: '1124',
        name_vi: 'Tiền gửi ngoại tệ - HKD',
        name_en: 'Foreign currency',
      },
      {
        code: '1122',
        name_vi: 'Tiền gửi ngoại tệ',
        name_en: 'Foreign currency',
      },
    ]);
  });
});
