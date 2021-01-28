import { ProgramEntity } from "src/program/entities/program.entity";

export class TeacherRO {
	_id: string;
	name: string;
	description: string;
	created: Date;
	updated: Date;
	programs: ProgramEntity[]
}