import * as XLSX from 'xlsx';
import * as path from 'path';

export function readFileExcel(fileName: string, cellStart = 1, rowStart = 1) {
  const filePath = path.join(__dirname, `./${fileName}`);
  const workbook = XLSX.readFile(filePath);
  const worksheet = workbook.Sheets['Sheet1'];
  const range = XLSX.utils.decode_range(worksheet['!ref']);
  range.s.r = rowStart;
  range.s.c = cellStart;
  const data = XLSX.utils.sheet_to_json(worksheet, { range });
  return data;
}
