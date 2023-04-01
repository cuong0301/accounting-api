import {
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';

import { AccountEntity } from '../account.entity';
import {
} from '../account.entity';

export class BaseGetQueries {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(0)
  page?: number = 0;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(0)
  size?: number = 5;

  @IsString()
  @IsOptional()
  searchText?: string;
}
