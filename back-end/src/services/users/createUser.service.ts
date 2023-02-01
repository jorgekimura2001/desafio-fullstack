import { IUserCreate } from "../../interfaces/users";
import { hash } from "bcrypt";
import { AppError } from "../../errors/appError";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";

const createUserService = async ({
  full_name,
  email,
  telephone,
  password,
}: IUserCreate) => {
  if (!full_name || !email || !telephone || !password) {
    throw new AppError("Some data is missings");
  }

  if (telephone.length !== 11) {
    throw new AppError("Telephone must contain 11 characters.");
  }

  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  const emailAlreadyExists = users.find((user) => user.email === email);

  if (emailAlreadyExists) {
    throw new AppError("Email already exists!");
  }

  const hashedPassword = await hash(password, 10);

  const newUser = {
    full_name,
    email,
    telephone,
    password: hashedPassword,
  };

  const createdUser = userRepository.create(newUser);
  await userRepository.save(createdUser);

  return createdUser;
};

export default createUserService;
