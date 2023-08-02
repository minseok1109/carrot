"use client";

import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import axios from "axios";
import dayjs from "dayjs";
import { URL } from "../constant";

interface BizPriceType {
  biz_id: number;
  biz_price: number;
  createdAt: string;
  post_id: number;
  user_id: number;
}

interface ChartDataState {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  }[];
}

ChartJS.register(
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

const options = {
  responsive: false,
  maintainAspectRatio: false,
  animation: {
    duration: 0,
  },
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
};

function Chart({ productId }: { productId: number }) {
  const [data, setData] = useState<ChartDataState>({
    labels: [],
    datasets: [
      {
        label: "실시간 입찰 가격",
        data: [],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`${URL}/post/posts/biz/${productId}`);
      const { data } = result;
      const labels = data.map((item: BizPriceType) =>
        dayjs(item.createdAt).format("MM-DD HH:mm")
      );
      const prices = data.map((item: BizPriceType) => item.biz_price);
      setData({
        labels,
        datasets: [
          {
            label: "실시간 입찰 가격",
            data: prices,
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ],
      });
    };
    fetchData();
  }, [productId]);

  useEffect(() => {
    const interval = setInterval(async () => {
      const result = await axios.get(`${URL}/post/posts/realtime/${productId}`);
      const { data } = result;
      setData((prevData) => {
        //TODO: 5초마다 서버에서 데이터 받아와서 새로운 레이블 추가해야 함

        const newLabels = [
          ...prevData.labels,
          dayjs(data.createdAt).format("MM-DD HH:mm"),
        ];
        const newData1 = [...prevData.datasets[0].data, data.biz_price];

        return {
          labels: newLabels,
          datasets: [
            {
              ...prevData.datasets[0],
              data: newData1,
            },
          ],
        };
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [productId]);

  return <Line options={options} data={data} width={600} height={600} />;
}

export default Chart;
