import { getMessage } from "../../../utils/translation/getMessage";
import { UserRepository } from "../repository/user.repository";
import bcrypt from "bcryptjs";

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async registerUser(data: { name: string; email: string; password: string }) {
    const { name, email, password } = data;

    if (!name || !email || !password) {
      throw new Error("All fields are required.");
    }

    if (await this.userRepository.findByEmail(email)) {
      throw new Error(getMessage("en", "emailExists"));
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    return this.userRepository.createUser(name, email, hash);
  }
}
