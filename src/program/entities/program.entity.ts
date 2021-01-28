import { type } from 'os';
import { TeacherEntity } from 'src/teacher/entity/teacher.entity';
import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ObjectIdColumn,
	ManyToMany,
	JoinTable,
	BeforeInsert,
} from 'typeorm';

@Entity('program')
export class ProgramEntity {
  @ObjectIdColumn()
  _id: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @Column('text', {
		unique: true
	})
  name: string;

  @Column('text')
	description: string;
	
  @Column('array')
	teachers: Array<TeacherEntity>

	@BeforeInsert()
	checkTeacher() {
		this.teachers = []
	}
}
