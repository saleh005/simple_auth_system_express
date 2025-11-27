import User from "../models/user";

export const getAllUsersService = async () => {
  return await User.findAll({
    attributes: ["id", "name", "email", "role", "createdAt"],
  });
};

export const getUserByIdService = async (id: number) => {
  return await User.findByPk(id, {
    attributes: ["id", "name", "email", "role", "createdAt"],
  });
};

export const updateUserService = async (id: number, data: any) => {
  const user = await User.findByPk(id);
  if (!user) return null;

  await user.update(data);
  return user;
};

export const deleteUserService = async (id: number) => {
  const user = await User.findByPk(id);
  if (!user) return null;

  await user.destroy();
  return true;
};
