
import { Request, Response } from 'express';
import Product from '../models/Product';
import mongoose from 'mongoose';



// Create Product
export const createProduct = async (req: Request, res: Response) => {
  const { name, description, price } = req.body;
  const newProduct = new Product({ _id:null, name, description, price });
  await newProduct.save();
  res.status(201).json(newProduct);
};

// Get All Products
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch(err:any) {
    res.status(500).json({message:err.message});
  }
};

// Get All Products
export const getProductById = async (req: Request, res: Response) => {
  try {
    // ADD THIS CHECK
    if (!mongoose.isValidObjectId(req.params.id)){ // This checks allows us to not go into catch block and return appropriate response
      return res.status(404).send({message:global.constants.error_404})
    }
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).send({message:global.constants.error_404})
    }
    res.send(product)
  } catch (error) {
    res.status(500).send()
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    // ADD THIS CHECK
    if (!mongoose.isValidObjectId(req.params.id)){ // This checks allows us to not go into catch block and return appropriate response
      return res.status(404).send({message:global.constants.error_404})
    }
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id }, 
      { $set: req.body },
      { new: true }
    );
    if (!product) {
      return res.status(404).send({message:global.constants.error_404})
    }
    res.send(product)
  } catch (error) {
    res.status(500).send()
  }
};


export const deleteProduct = async (req: Request, res: Response) => {
  try {
    // ADD THIS CHECK
    if (!mongoose.isValidObjectId(req.params.id)){ // This checks allows us to not go into catch block and return appropriate response
      return res.status(404).send({message:global.constants.error_404})
    }
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).send({message:global.constants.error_404})
    }
    res.send(product)
  } catch (error) {
    res.status(500).send()
  }
};


export const filterProducts = async (req: Request, res: Response) => {
  try {
    const objectIds = req.body?.ids?.map(id => new mongoose.Types.ObjectId(id));
    const products = await Product.find({ _id: { $in: objectIds } });
    res.send(products)
  } catch (error) {
    res.status(500).send()
  }
};


