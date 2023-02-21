import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DateTransformer } from '../constant/transformers/date.transformer';
import { EntityName } from '../constant/enum/entity-name.enum';
import { IsTrimmedStringWithoutTab } from '../constant/validators/trimmed-string-without-tab.validator';
@Entity(EntityName.ACCOUNTS)
export class AccountEntity {
  @PrimaryColumn({
    type: 'integer',
  })
  code!: number;

  @CreateDateColumn({
    name: 'created_at',
    transformer: new DateTransformer(),
  })
  createdAt: Date;

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

  @UpdateDateColumn({
    name: 'updated_at',
    transformer: new DateTransformer(),
  })
  updatedAt: Date;
}
