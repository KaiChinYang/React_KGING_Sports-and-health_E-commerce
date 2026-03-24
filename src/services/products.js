import { api, API_PATH } from "./api";

export const getProductsApi = (page = 1, category) => {
  return api.get(`/api/${API_PATH}/products`, {
    params: {
      page,
      category: category === "all" ? undefined : category,
    },
  });
};

export const getAllProductsApi = () => {
  return api.get(`/api/${API_PATH}/products/all`);
};

export const getSingleProductsApi = (productId) => {
  return api.get(`/api/${API_PATH}/product/${productId}`);
};