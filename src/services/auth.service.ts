import { User } from "../models";
import { hashPassword, comparePassword } from "../utils/password";
import { signJwt } from "../utils/jwt";

// Simple in-memory token blacklist
const tokenBlacklist = new Set<string>();

class AuthService {
  async register(name: string, email: string, password: string) {
    const exists = await User.findOne({ where: { email } });
    if (exists) {
      throw new Error("Email already registered");
    }

    const hashed = await hashPassword(password);

    const user = await User.create({
      name,
      email,
      password: hashed
    });

    const token = signJwt({
      id: user.id,
      email: user.email,
      role: user.role
    });

    return { user, token };
  }

  async login(email: string, password: string) {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error("User not found");

    const valid = await comparePassword(password, user.password);
    if (!valid) throw new Error("Invalid credentials");

    const token = signJwt({
      id: user.id,
      email: user.email,
      role: user.role
    });

    return { user, token };
  }

  async logout(userId: number, token: string) {
    // Add token to blacklist to prevent reuse
    tokenBlacklist.add(token);
    
    return { message: "User logged out successfully" };
  }

  // Check if token is blacklisted
  isTokenBlacklisted(token: string): boolean {
    return tokenBlacklist.has(token);
  }

  // Utility to clear blacklist for testing
  clearBlacklist(): void {
    tokenBlacklist.clear();
  }
}

export default new AuthService();
