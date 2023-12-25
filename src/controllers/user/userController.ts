import { registerUserService } from "../../services/user/userService";

export const registerUser = async (req: any, res: any) => {
  try {
    const { name, password, email, role } = req.body;
    const userDetails = {
      name,
      password,
      email,
      role,
    };

    const userId = await registerUserService(userDetails);
    res.json({ message: "User Registered successfully", id: userId });
  } catch (error: any) {
    res.status(500).json("some Error occured");
  }
};
