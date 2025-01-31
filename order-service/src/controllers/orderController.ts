import Order from '../models/Order';
import { fetchProductData, filterProductData } from "../services/productService";
import {produtsToOrderList, produtToOrder } from '../services/mapingService '


import { Request, Response } from 'express';
import mongoose from 'mongoose';
// Create an Order
export const createOrder = async (req: Request, res: Response) => {

  const params = req.body;
  params.userId = req.user.userId;
  const newOrder = new Order(params);
  await newOrder.save();
  res.status(201).json(newOrder);
};

// Get All Orders
export const getAllOrders = async (req:Request, res:Response) => {
  
  const orders = await Order.find();
  const produtcs = await filterProductData('/filter', {ids:orders.map(order=>order.productId)});
  const mappedData =  produtsToOrderList(orders, produtcs.status ? produtcs.data : []);
  res.json(mappedData);
};

// Get  Order by id
export const getOrderById = async (req:Request, res:Response) => {
  try {
    // ADD THIS CHECK
    if (!mongoose.isValidObjectId(req.params.id)){ // This checks allows us to not go into catch block and return appropriate response
      return res.status(404).send({message:global.constants.error_404})
    }
    const order = await Order.findById(req.params.id)
    if (!order) {
      return res.status(404).send({message:global.constants.error_404})
    }
    const product = await fetchProductData("/"+order.productId); 

    res.send(produtToOrder(order, product))
  } catch (error) {
    res.status(500).send()
  }
};


