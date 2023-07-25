export const KAKAO_AUTHCODE = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}
`;

export const PRODUCTS_URL = "https://dummyjson.com/products/";
export const PRODUCT_URL = (id: string) =>
  `https://dummyjson.com/products/${id}`;
export const BID = "입찰하기";
export const INPUT_BID = "입찰가격 입력";
export const INPUT_COST = "가격을 입력하세요.";
export const CLOSE = "닫기";
export const MAKEPRICE = (price: number) => `₩ ${price.toLocaleString()}원`;
