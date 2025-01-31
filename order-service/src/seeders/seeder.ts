import mongoose from "mongoose";
import Order from "../models/Order";

export const runSeeder = async () => {
  try {
    // Check if data already exists
    const userCount = await Order.countDocuments();
    if (userCount > 0) {
      console.log("Seeder: Orders already exist. Skipping...");
      return;
    }

    // Insert seed data
    await Order.insertMany([
      {_id:"679b265a19a67d55acb703c7", productId: "679b04554d767546802df7a4", userId: "679a6773db4afb1b4c1dc2b1", quantity:1 },
      {_id:"679b265a19a67d55acb703c8", productId: "679b04574d767546802df7a6", userId: "679a6773db4afb1b4c1dc2b1", quantity:2 },
      {_id:"679b265a19a67d55acb703c9", productId: "679b04554d767546802df7a4", userId: "679a6773db4afb1b4c1dc2b1", quantity:3 },
      {_id:"679b265a19a67d55acb70310", productId: "679b04574d767546802df7a6", userId: "679a6773db4afb1b4c1dc2b1", quantity:10 },
      {_id:"679b265a19a67d55acb70311", productId: "679b04554d767546802df7a4", userId: "679a6773db4afb1b4c1dc2b1", quantity:10 },
      {_id:"679b265a19a67d55acb70312", productId: "679b04574d767546802df7a6", userId: "679a6773db4afb1b4c1dc2b1", quantity:10 },
      {_id:"679b265a19a67d55acb70313", productId: "679b04554d767546802df7a4", userId: "679a6773db4afb1b4c1dc2b1", quantity:10 },
      {_id:"679b265a19a67d55acb70314", productId: "679b04574d767546802df7a6", userId: "679a6773db4afb1b4c1dc2b1", quantity:10 },
    ])
    console.log("Seeder: Orders have been inserted.");
  } catch (error) {
    console.error("Seeder Error:", error.message);
  }
};
