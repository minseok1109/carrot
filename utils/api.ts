import { PRODUCTS_URL, PRODUCT_URL, URL } from "@/app/constant";
import { cookies } from "next/headers";
import { BizPriceType, UniqueUserType } from "./types";
import dayjs from "dayjs";

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
  const res = await fetch(`${URL}/auth/user`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

//실시간 입찰자 수 카운트하는 함수
export const countUniqueUser = (data: BizPriceType[]) => {
  const uniqueUsers: UniqueUserType = {};

  data.forEach((item) => {
    const userId = item.user_id;
    uniqueUsers[userId] = true;
  });

  const uniqueUserCount = Object.keys(uniqueUsers).length;

  return uniqueUserCount;
};

export const getBizPriceAndLabels = async (productId: number) => {
  const accessToken = cookies().get("accessToken")?.value;
  try {
    const data = await fetch(`${URL}/post/posts/biz/${productId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const res = await data.json();
    const labels = res?.map((item: BizPriceType) =>
      dayjs(item.createdAt).format("MM-DD HH:mm")
    );
    const prices = res?.map((item: BizPriceType) => item.biz_price);
    return [labels, prices];
  } catch (error) {
    console.error(error);
  }
};

export const getCurrentUserCount = async (productId: number) => {
  try {
    const accessToken = cookies().get("accessToken")?.value;
    const data = await fetch(`${URL}/post/posts/biz/${productId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const res = await data.json();
    const uniqueUserCount = countUniqueUser(res);
    return uniqueUserCount;
  } catch (error) {
    console.error(error);
  }
};
