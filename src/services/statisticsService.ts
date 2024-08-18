import userService from './userService';

const getStatistics = async () => {
  const users = await userService.getAllUsers();
  return users.map(user => ({ username: user.username, role: user.role }));
};

export default { getStatistics };
