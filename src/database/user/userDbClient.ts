import { db } from "../../lib/db";

export const registerUserInDb = async (userDetails: any): Promise<any> => {
  try {
    await db.raw(
      "INSERT INTO users (id, name, email) VALUES (?, ?, ?)",
      [userDetails.id, userDetails.name, userDetails.email]
    );

    await db.raw("INSERT into user_roles (id,role) VALUES(?,?)", [
      userDetails.id,
      userDetails.role,
    ]);

    return "";
  } catch (error) {
    console.error("Error updating user details with raw SQL:", error);
    throw new Error("Failed to update user details with raw SQL");
  }
};

export const getUserDetailsFromDb = async (emailId: string) => {
  const response = await db.raw(
    "SELECT user_roles.role,user_roles.id from user_roles JOIN users ON users.id=user_roles.id WHERE email=? ",
    [emailId]
  );
  return response;
};
