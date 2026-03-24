import { api, API_PATH } from "./api";

export const getCartApi = () => {
  return api.get(`/api/${API_PATH}/cart`);
};
export const addToCartApi = (data) => {
  return api.post(`/api/${API_PATH}/cart`, { data });
};
export const updateCartQtyApi = (id, data) => {
  return api.put(`/api/${API_PATH}/cart/${id}`, { data });
};

export const deleteSingleCartQtyApi = (id) => {
  return api.delete(`/api/${API_PATH}/cart/${id}`);
};
export const clearCartQtyApi = () => {
  return api.delete(`/api/${API_PATH}/carts`);
};

export const sendOrderApi = (data) => {
  return api.post(`/api/${API_PATH}/order`, { data });
};

export const getSingleOrderApi = (orderId) => {
  return api.get(`/api/${API_PATH}/order/${orderId}`);
};

export const payOrderApi = (orderId) => {
  return api.post(`/api/${API_PATH}/pay/${orderId}`);
};