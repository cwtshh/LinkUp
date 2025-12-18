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
      throw new Error(getMessage("pt", "emailExists"));
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    return this.userRepository.createUser(name, email, hash);
  }

  async loginUser(email: string, password: string) {
    if (!email || !password) {
      throw new Error(getMessage("pt", "invalidCredentials"));
    }

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error(getMessage("pt", "invalidCredentials"));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error(getMessage("pt", "invalidCredentials"));
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }

  async refreshSession(id: string) {
    if (!id) {
      throw new Error("ID is required.");
    }

    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error("User not found.");
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }
}
