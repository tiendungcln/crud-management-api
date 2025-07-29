import { Router } from 'express';
import {
  createNote,
  deleteNote,
  getNoteById,
  getNotes,
  updateNote,
} from '../controllers/note.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { validateDto } from '../middlewares/validate.middleware';
import { CreateNoteDto } from '../dtos/NoteDto/CreateNoteDto';
import { UpdateNoteDto } from '../dtos/NoteDto/UpdateNoteDto';


const router = Router();

/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: Quản lý ghi chú
 */

/**
 * @swagger
 * /api/notes:
 *   get:
 *     summary: Lấy danh sách ghi chú của người dùng
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Trả về danh sách note
 */

/**
 * @swagger
 * /api/notes:
 *   post:
 *     summary: Tạo ghi chú mới
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Note được tạo thành công
 */

/**
 * @swagger
 * /api/notes/{id}:
 *   get:
 *     summary: Lấy chi tiết 1 ghi chú
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Chi tiết note
 *       404:
 *         description: Không tìm thấy
 */

/**
 * @swagger
 * /api/notes/{id}:
 *   put:
 *     summary: Cập nhật ghi chú
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       404:
 *         description: Không tìm thấy
 */

/**
 * @swagger
 * /api/notes/{id}:
 *   delete:
 *     summary: Xoá ghi chú
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Xoá thành công
 *       404:
 *         description: Không tìm thấy
 */

router.use(authenticate);
router.post('/', validateDto(CreateNoteDto), createNote);
router.get('/', getNotes);
router.get('/:id', getNoteById);
router.put('/:id', validateDto(UpdateNoteDto), updateNote);
router.delete('/:id', deleteNote);

export default router;
