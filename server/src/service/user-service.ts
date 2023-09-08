import User, { IUser } from "../models/User";

const generateToken = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

const CreateUser = async (ip, email: string): Promise<IUser> => {
  if (await UserExists(ip)) {
    throw new Error("User already exists");
  }

  const user: IUser = new User({ ip, email, token: generateToken() });

  return await user.save();
};

const FindUser = async (ip: string): Promise<IUser> => {
  const user: IUser = await User.findOne({ ip });
  return user;
};

const UserExists = async (token: string): Promise<boolean> => {
  const user: IUser = await FindUser(token);
  return user !== null;
};

const VerifyUser = async (token: string): Promise<IUser> => {
  try {
    const user: IUser = await User.findOneAndUpdate(
      { token },
      { verified: true },
      { new: true }
    );
    return user;
  } catch (error) {
    throw error;
  }
};

export { CreateUser, FindUser, UserExists, VerifyUser };
