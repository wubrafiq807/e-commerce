import mongoose from "mongoose";
import User from "../models/User";
import bcrypt from 'bcryptjs';

export const runSeeder = async () => {
  try {
    // Check if data already exists
    const userCount = await User.countDocuments();
    if (userCount > 0) {
      console.log("Seeder: Users already exist. Skipping...");
      return;
    }
    const hashedPassword = await bcrypt.hash("test0001", 10);

    // Insert seed data
    await User.insertMany([
      { _id:new mongoose.Types.ObjectId("679a6773db4afb1b4c1dc2b1"),name: "test user", email: "mailtest@example.com",password:hashedPassword}
    ]);

    console.log("Seeder: Users have been inserted.");
  } catch (error) {
    console.error("Seeder Error:", error);
  }
};
