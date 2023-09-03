import User, { IUser } from "../models/User";

const CreateUser = async (ip: string, email: string): Promise<IUser> => {
  if (await UserExists(ip)) {
    throw new Error("User already exists");
  }
  const user: IUser = new User({ ip, email });
  return await user.save();
};

const FindUser = async (ip: string): Promise<IUser> => {
  const user: IUser = await User.findOne({ ip });
  return user;
};

const UserExists = async (ip: string): Promise<boolean> => {
  const user: IUser = await FindUser(ip);
  return user !== null;
};

const VerifyUser = async (ip: string, email?: string): Promise<IUser> => {
  try {
    const user: IUser = await User.findOneAndUpdate(
      { ip, email },
      { verified: true },
      { new: true }
    );
    return user;
  } catch (error) {
    throw error;
  }
};

const LoginUser = async (ip: string): Promise<IUser> => {
  try {
    const user: IUser = await User.findOneAndUpdate(
      { ip },
      { loggedIn: true },
      { new: true }
    );

    return user;
  } catch (error) {
    throw error;
  }
};

const LogoutUser = async (ip: string): Promise<IUser> => {
  try {
    const user: IUser = await User.findOneAndUpdate(
      { ip },
      { loggedIn: false },
      { new: true }
    );

    return user;
  } catch (error) {
    throw error;
  }
};

const isUserLoggedIn = async (ip: string): Promise<boolean> => {
  const user: IUser = await FindUser(ip);
  return user.loggedIn;
};
export {
  CreateUser,
  FindUser,
  UserExists,
  VerifyUser,
  LoginUser,
  LogoutUser,
  isUserLoggedIn,
};
