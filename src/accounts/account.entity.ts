import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DateTransformer } from '../constants/transformers/date.transformer';
import { EntityName } from '../constants/./enums/entity-name.enum';
import { IsTrimmedStringWithoutTab } from '../constants/validators/trimmed-string-without-tab.validator';

export type SelectFields =
  | keyof AccountEntity
  | 'createdAt'
  | 'updatedAt';

export const SELECTABLE_FIELDS: SelectFields[] = [
  'code',
  'vietnameseName',
  'englishName',
  'createdAt',
  'updatedAt',
];

@Entity(EntityName.ACCOUNTS)
export class AccountEntity {
  @PrimaryColumn({
    type: 'integer',
  })
  code!: number;

  @Column({
    name: 'name_vi',
  })
  @IsTrimmedStringWithoutTab()
  vietnameseName: string;

  @Column({
    name: 'name_en',
  })
  @IsTrimmedStringWithoutTab()
  englishName: string;

  @CreateDateColumn({
    name: 'created_at',
    transformer: new DateTransformer(),
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    transformer: new DateTransformer(),
  })
  updatedAt: Date;
}
