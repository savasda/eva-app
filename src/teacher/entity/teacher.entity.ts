import { ProgramEntity } from "src/program/entities/program.entity";
import { BeforeInsert, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ObjectIdColumn, UpdateDateColumn } from "typeorm";

@Entity('teacher')
export class TeacherEntity {
	@ObjectIdColumn()
	_id: string;

	@Column({
		type: 'text',
	})
	name: string;

	@Column({
		type: 'text',
	})
	description: string;

	@CreateDateColumn()
	created: Date;

	@UpdateDateColumn()
	updated: Date;

  @Column('array')
	programs: ProgramEntity[]

	@BeforeInsert()
	checkPrograms() {
		this.programs = []
	}
}