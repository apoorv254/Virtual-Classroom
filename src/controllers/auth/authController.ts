import jwt from "jsonwebtoken";
import { getUserByEmailId } from "../../services/user/userService";

const SECRET_TOKEN =
  process.env.SECRET_TOKEN ||
  "09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611";

export const userLogin = async (req: any, res: any) => {
  try {
    const { email } = req.body;
    const roleOfUser: any = await getUserByEmailId(email);
    const token = jwt.sign(roleOfUser, SECRET_TOKEN, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    console.log(error, "erro");
    res.status(500).json({ message: "Unexpected Error Occured" });
  }
};
