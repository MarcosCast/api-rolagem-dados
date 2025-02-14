import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {

  @PrimaryGeneratedColumn('uuid', { name: 'user_inid_users' })
  id!: string;

  @Column({ name: 'user_vcnm_username', length: 50 })
  username!: string;

  @Column({ name: 'user_vcnm_platform', length: 20 })
  platform!: string;

  @CreateDateColumn({ name: 'user_tstm_createdAt' })
  createdAt!: Date;
  
}
