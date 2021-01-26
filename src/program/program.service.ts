import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ProgramDTO } from './entities/program.dto';
import { ProgramEntity } from './entities/program.entity';
import { MESSAGE } from '../shared/messages';

@Injectable()
export class ProgramService {
  constructor(
    @InjectRepository(ProgramEntity)
    private readonly programRepository: MongoRepository<ProgramEntity>,
  ) {
  }

  async getAllPrograms(): Promise<Array<ProgramDTO>> {
    return await this.programRepository.find();
  }

  async create(data: ProgramDTO) {
    const program = await this.programRepository.create(data);
    await this.programRepository.save(data);
    return program;
  }

  async read(id: string): Promise<ProgramDTO> {
		const program = await this.programRepository.findOne(id);
		if(!program) {
			throw new HttpException(MESSAGE.NOT_FOUND, HttpStatus.NOT_FOUND);
		}
    return program;
  }

  async update(id: string, data: Partial<ProgramDTO>): Promise<ProgramDTO> {
		const program = await this.programRepository.findOne(id);
		if(program) {
			await this.programRepository.update(id, data);
		} else {
			throw new HttpException(MESSAGE.NOT_FOUND, HttpStatus.NOT_FOUND);
		}
		return program;
  }

  async delete(id: string): Promise<ProgramDTO>  {
		const program = await this.programRepository.findOne(id);
		if(program) {
			await this.programRepository.delete(id);
			return program
		} else {
			throw new HttpException(MESSAGE.NOT_FOUND, HttpStatus.NOT_FOUND);
		}
  }
}
