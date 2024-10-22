import { EntityRelationalHelper } from '../..//utils/relational-entity-helper';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'role',
})
export class RoleEntity extends EntityRelationalHelper {
  @PrimaryColumn()
  id: number;

  @Column()
  name?: string;
}
