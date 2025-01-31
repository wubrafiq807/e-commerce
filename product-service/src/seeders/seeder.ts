import mongoose from "mongoose";
import Product from "../models/Product";

export const runSeeder = async () => {
  try {
    // Check if data already exists
    const product = await Product.countDocuments();
    if (product > 0) {
      console.log("Seeder: products already exist. Skipping...");
      return;
    }

    // Insert seed data
    await Product.insertMany([
      { _id:"679b04554d767546802df7a4",name: "product 1", description:'test desc', price: 100 },
      { _id:"679b04574d767546802df7a6",name: "product 2", description:'test desc', price: 100 }
    ]);

    console.log("Seeder: Producst have been inserted.");
  } catch (error) {
    console.error("Seeder Error:", error);
  }
};
