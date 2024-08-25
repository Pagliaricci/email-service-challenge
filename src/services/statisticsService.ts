import userService from './userService';
import prisma from '../prismaClient';

const getStatistics = async () => {
  const users = await userService.getAllUsers();

  const stats = await Promise.all(users.map(async (user) => {
    const emailCount = await prisma.email.count({
      where: { userId: user.id },
    });

    return {
      username: user.username,
      role: user.role,
      emailsSent: emailCount,
    };
  }));

  return stats;
};

export default { getStatistics };
