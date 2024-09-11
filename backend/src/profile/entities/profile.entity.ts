import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('profiles')
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'text', nullable: true })
  name: string | null;
  @Column('text', { nullable: true, name: 'avatar_url' })
  avatarUrl: string | null;
  @Column({ type: 'text', nullable: true, name: 'phone_number' })
  phoneNumber: string | null;
  @Column({ type: 'text', nullable: true })
  address: string | null;
  @Column({ type: 'date', nullable: true, name: 'birth_date' })
  birthdate: Date | null;
  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn({ name: 'user_id' }) // Columna de clave foránea en `profiles`
  user: User;
}
