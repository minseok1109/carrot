export interface Product {
  user_id: number;
  post_id: number;
  title: string;
  content: string;
  photo_ip: string[];
  min_price: number;
  biz_count: number;
  biz_price: number;
  dueToDate: string;
  is_sold: boolean;
  createdAt: string;
}

export interface ImgInfo {
  blob: Blob;
  name: string;
  size: number;
  type: string;
}

export interface User {
  user_id: number;
  nickname: string;
  profile: string;
}

export interface BizPriceType {
  biz_id: number;
  biz_price: number;
  createdAt: string;
  post_id: number;
  user_id: number;
}

export interface ChartDataState {
  labels: string[];
  datasets: {
    label: string;
    yAxisID?: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  }[];
}

export interface UniqueUserType {
  [key: number]: boolean;
}
