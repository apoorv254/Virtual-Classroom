import { v4 as uuidv4 } from "uuid";
import {
  getUserDetailsFromDb,
  registerUserInDb,
} from "../../database/user/userDbClient";

export const registerUserService = async (userDetails: any) => {
  const userId = uuidv4();
  userDetails.id = userId;
  await registerUserInDb(userDetails);
  return userId;
};

export const getUserByEmailId = async (emailId: string): Promise<any> => {
  const response = await getUserDetailsFromDb(emailId);
  return response[0][0];
};
