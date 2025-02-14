import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'dice_types' })
export class DiceType {

  @PrimaryColumn({ name: 'dice_inid_dicetypes' })
  id!: number;

  @Column({ name: 'dice_vcnm_name', unique: true, length: 10 })
  name!: string;

  @Column({ name: 'dice_invl_sides' })
  sides!: number;
  
}
