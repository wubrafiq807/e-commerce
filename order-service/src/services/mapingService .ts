// src/services/mapingService.ts

export const produtToOrder = (order: any, product: any) => {

  return {
    id: order?._id,
    userId: order?.userId,
    productId: order?.productId,
    quantity: order?.quantity,
    productDetails: product?.status ? {
      id: product?.data?._id,
      name: product?.data?.name,
      description: product?.data?.description,
      price: product?.data?.price
    } : product
  };
};

export const produtsToOrderList = (orders: Array<any>, products: Array<any>) => {
  return orders?.map(order => {
    return produtToOrder(order, { status: true, data: products.find(prod => order.productId == prod._id) });
  })
};
