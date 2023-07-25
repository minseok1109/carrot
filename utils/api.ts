import { PRODUCTS_URL, PRODUCT_URL } from "@/app/constant";

export const getProductsData = async () => {
  const res = await fetch(PRODUCTS_URL);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export const getProductData = async (params: { id: string }) => {
  const res = await fetch(PRODUCT_URL(params.id));
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};
