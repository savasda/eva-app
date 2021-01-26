import { TeacherEntity } from 'src/teacher/entity/teacher.entity';
import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ObjectIdColumn,
	ManyToMany,
	JoinTable,
} from 'typeorm';

@Entity('program')
export class ProgramEntity {
  @ObjectIdColumn()
  _id: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @Column('text')
  name: string;

  @Column('text')
	description: string;
	
	@ManyToMany(() => TeacherEntity)
	@JoinTable()
	teachers: Array<TeacherEntity>
}
