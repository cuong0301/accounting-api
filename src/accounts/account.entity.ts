import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DateTransformer } from '../constants/transformers/date.transformer';
import { EntityName } from '../constants/enum/entity-name.enum';
import { IsTrimmedStringWithoutTab } from '../constants/validators/trimmed-string-without-tab.validator';
@Entity(EntityName.ACCOUNTS)
export class AccountEntity {
  @PrimaryColumn({
    type: 'integer',
  })
  code!: number;

  @Column({
    type: 'varchar',
    name: 'name_vi',
  })
  @IsTrimmedStringWithoutTab()
  vietnameseName: string;

  @Column({
    type: 'varchar',
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
