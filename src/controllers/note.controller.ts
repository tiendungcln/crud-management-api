import { Request, Response } from 'express';
import { NoteService } from '../services/note.service';
import { AuthRequest } from '../middlewares/auth.middleware';

const noteService = new NoteService();

export const createNote = async (req: AuthRequest, res: Response) => {
  try {
    const note = await noteService.create(req.user.id, req.body);
    res.status(201).json(note);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getNotes = async (req: AuthRequest, res: Response) => {
  const notes = await noteService.getAll(req.user.id);
  res.json(notes);
};

export const getNoteById = async (req: AuthRequest, res: Response) => {
  try {
    const note = await noteService.getById(+req.params.id, req.user.id);
    res.json(note);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};

export const updateNote = async (req: AuthRequest, res: Response) => {
  try {
    const note = await noteService.update(+req.params.id, req.user.id, req.body);
    res.json(note);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};

export const deleteNote = async (req: AuthRequest, res: Response) => {
  try {
    await noteService.delete(+req.params.id, req.user.id);
    res.status(204).send();
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};
