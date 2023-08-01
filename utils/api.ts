import { PRODUCTS_URL, PRODUCT_URL } from "@/app/constant";
import { cookies } from "next/headers";

export const getProductsData = async () => {
  const accessToken = cookies().get("accessToken")?.value;

  try {
    const res = await fetch(PRODUCTS_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.json();
  } catch (error) {
    console.error(error);
  }
};

export const getProductData = async (params: { id: string }) => {
  const accessToken = cookies().get("accessToken")?.value;
  const res = await fetch(PRODUCT_URL(params.id), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export const getUser = async () => {
  const accessToken = cookies().get("accessToken")?.value;
  const res = await fetch("http://localhost:5000/auth/user", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};
