import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import userService from './userService';
import { Role } from '../types'; 

const register = async (username: string, password: string, role: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const userRole: Role = role as Role;

  const user = await userService.createUser({ username, password: hashedPassword, role: userRole });
  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '1h' });
  return { token };
};

const login = async (username: string, password: string) => {
  const user = await userService.findUserByUsername(username);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid credentials');
  }
  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '1h' });
  return token;
};

export default { register, login };
