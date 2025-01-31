import React, { useEffect, useState } from "react";
import { getOrders } from "../services/order.service";

interface Item {
  userId: string;
  quantity: number;
  productId: string; 
  productName:string;
  productDescription:string;
  price:number;
}

const Home: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getOrders();
        const formattedData = response.data.map((order: any) => ({
          userId: order.userId,
          quantity: order.quantity,
          productId: order.productId,
          productName: order?.productDetails?.name,
          productDescription: order?.productDetails?.description,
          price: order?.productDetails?.price,
        }));

        setItems(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-center mt-3">Loading...</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Order List</h2>
      <table className="table table-bordered table-striped">
        <thead className="table-success">
          <tr>
            <th>#</th>
            <th>User ID</th>
            <th>Quantity</th>
            <th>Product Id</th>
            <th>Product Name</th>
            <th>Product Details</th>
            <th>Unit Price</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.userId}</td>
              <td>{item.quantity}</td>
              <td>{item.productId}</td>
              <td>{item.productName}</td>
              <td>{item.productDescription}</td>
              <td>{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
