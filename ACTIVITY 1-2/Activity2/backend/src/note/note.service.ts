import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './note.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { User } from '../user/user.entity';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private noteRepository: Repository<Note>,
  ) {}

  async create(createNoteDto: CreateNoteDto, user: User): Promise<Note> {
    const note = this.noteRepository.create({
      ...createNoteDto,
      userId: user.id,
    });

    return this.noteRepository.save(note);
  }

  async findAll(user: User): Promise<Note[]> {
    return this.noteRepository.find({
      where: { userId: user.id },
      order: { updatedAt: 'DESC' },
    });
  }

  async findOne(id: number, user: User): Promise<Note> {
    const note = await this.noteRepository.findOne({
      where: { id, userId: user.id },
    });

    if (!note) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }

    return note;
  }

  async update(id: number, updateNoteDto: UpdateNoteDto, user: User): Promise<Note> {
    const note = await this.findOne(id, user);

    Object.assign(note, updateNoteDto);
    return this.noteRepository.save(note);
  }

  async remove(id: number, user: User): Promise<void> {
    const note = await this.findOne(id, user);
    await this.noteRepository.remove(note);
  }

  async getStats(user: User): Promise<{ totalNotes: number }> {
    const totalNotes = await this.noteRepository.count({
      where: { userId: user.id },
    });

    return { totalNotes };
  }
}
