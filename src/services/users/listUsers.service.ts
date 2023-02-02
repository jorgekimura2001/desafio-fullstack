import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUser } from "../../interfaces/users";

const userListService = async () => {
  const userRepository = AppDataSource.getRepository(User);

  const users: IUser[] = await userRepository.find();

  return users;
};

export default userListService;
