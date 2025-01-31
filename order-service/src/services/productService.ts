// src/services/productService.ts
import axios from "axios";

export const fetchProductData = async (id: string) => {
  try {

    let url = `${process.env.PRODUCT_SERVICE_API_URL}${id}`;

    const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${global.token}`, // Attach the Bearer Token
          "Content-Type": "application/json",
        }
      });
    return {status:true, data:response.data};
  } catch (error) {
    return {
        status:false,
        message: global.constants.error_404
    }
  }
};

export const filterProductData = async (endPoint: string, body:any) => {
  try {

    let url = `${process.env.PRODUCT_SERVICE_API_URL}${endPoint}`;
    const response = await axios.post(url, body, {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+global.token
      },      
    });
    return {status:true, data:response.data};
  } catch (error) {

    return {
        status:false,
        message: global.constants.error_404,
        debug:error.message
    }
  }
};
