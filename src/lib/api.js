import { commerce } from "./commerce";

export const getAllCategories = async () => {
  const { data } = await commerce.categories.list();
  return data;
};

export const getAllProducts = async () => {
  const { data } = await commerce.products.list();
  return data;
};

export const removeProductCart = async (productId) => {
  const { cart } = await commerce.cart.remove(productId);
  return cart;
};

export const updateProductCart = async (productId, quantity) => {
  const { cart } = await commerce.cart.update(productId, { quantity });
  return cart;
};
