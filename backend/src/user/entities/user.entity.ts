import { Role } from 'src/auth/entities/role.entity';
import { Profile } from 'src/profile/entities/profile.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  email: string;

  @Column({ type: 'text', nullable: true })
  password: string;

  @ManyToMany(() => Role, (role) => role.users, { eager: true })
  roles: Role[];

  @OneToOne(() => Profile, (profile) => profile.user, {
    cascade: true,
    eager: true,
  })
  profile: Profile;

  @Column({ name: 'is_active', type: 'bool', default: true })
  isActive: boolean;
}
