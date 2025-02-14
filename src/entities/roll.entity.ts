import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { DiceType } from './dice-type.entity';

@Entity({ name: 'rolls' })
export class Roll {

  @PrimaryColumn({ name: 'roll_inid_rolls' })
  id!: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'roll_inid_user' })
  user!: User;

  @ManyToOne(() => DiceType)
  @JoinColumn({ name: 'roll_inid_dice' })
  dice!: DiceType;

  @Column({ name: 'roll_invl_result' })
  result!: number;

  @CreateDateColumn({ name: 'roll_tstm_rolledAt' })
  rolledAt!: Date;
  
}
