import { User } from '../entities/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../config/db.config';

const userRepo = AppDataSource.getRepository(User);

export class AuthService {
  async register(email: string, password: string) {
    const existing = await userRepo.findOneBy({ email });
    if (existing) throw new Error('Email already registered');

    const hashed = await bcrypt.hash(password, 10);
    const user = userRepo.create({ email, password: hashed });

    return await userRepo.save(user);
  }

  async login(email: string, password: string) {
    const user = await userRepo.findOneBy({ email });
    if (!user) throw new Error('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, {
      expiresIn: '1d',
    });

    return { token };
  }
}
