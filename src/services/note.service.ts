import { AppDataSource } from '../config/db.config';
import { Note } from '../entities/Note';
import { User } from '../entities/User';

const noteRepo = AppDataSource.getRepository(Note);
const userRepo = AppDataSource.getRepository(User);

export class NoteService {
  async create(userId: number, data: Partial<Note>) {
    const user = await userRepo.findOneBy({ id: userId });
    if (!user) throw new Error('User not found');

    const note = noteRepo.create({ ...data, user });
    return await noteRepo.save(note);
  }

  async getAll(userId: number) {
    return await noteRepo.find({
      where: { user: { id: userId } },
      order: { id: 'DESC' }
    });
  }

  async getById(id: number, userId: number) {
    const note = await noteRepo.findOne({
      where: { id, user: { id: userId } },
    });
    if (!note) throw new Error('Note not found or access denied');
    return note;
  }

  async update(id: number, userId: number, data: Partial<Note>) {
    const note = await this.getById(id, userId);
    noteRepo.merge(note, data);
    return await noteRepo.save(note);
  }

  async delete(id: number, userId: number) {
    const note = await this.getById(id, userId);
    return await noteRepo.remove(note);
  }
}
