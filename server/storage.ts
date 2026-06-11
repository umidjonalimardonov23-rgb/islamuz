import { users, type User, type InsertUser } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getTasbihCount(userId: string): Promise<number>;
  setTasbihCount(userId: string, count: number): Promise<number>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private tasbihCounts: Map<string, number>;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.tasbihCounts = new Map();
    this.currentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getTasbihCount(userId: string): Promise<number> {
    return this.tasbihCounts.get(userId) ?? 0;
  }

  async setTasbihCount(userId: string, count: number): Promise<number> {
    this.tasbihCounts.set(userId, count);
    return count;
  }
}

export const storage = new MemStorage();
