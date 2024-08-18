
import prisma from '../prismaClient';

type Role = 'USER' | 'ADMIN'; 

const createUser = async (data: { username: string, password: string, role: Role }) => {
  return await prisma.user.create({
    data: {
      username: data.username,
      password: data.password,
      role: data.role, 
    },
  });
};

const findUserByUsername = async (username: string) => {
  return await prisma.user.findUnique({ where: { username } });
};

const getUserById = async (id: number) => { 
  return await prisma.user.findUnique({ where: { id } });
};

const getAllUsers = async () => {
  return await prisma.user.findMany();
};

export default { createUser, findUserByUsername, getUserById, getAllUsers };
