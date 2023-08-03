"use client";

import React, { useState, useEffect, useRef } from "react";
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
    yAxisID?: string;
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
  scales: {
    "y-right": {
      position: "right",
    },
  },
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
};

function BizPriceChart({
  productId,
  label,
  lineColor,
}: {
  productId: number;
  label: string;
  lineColor: string;
}) {
  const chartRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<ChartDataState>({
    labels: [],
    datasets: [
      {
        label,
        yAxisID: "y-right",
        data: [],
        borderColor: lineColor,
        backgroundColor: lineColor.split(")").join(", 0.5)"),
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
            label,
            yAxisID: "y-right",
            data: prices,
            borderColor: lineColor,
            backgroundColor: lineColor.split(")").join(", 0.5)"),
          },
        ],
      });
    };
    fetchData();
  }, [productId, lineColor, label]);

  useEffect(() => {
    const scrollToleft = () => {
      const chart = chartRef.current;
      chart?.scrollIntoView();
    };

    const interval = setInterval(async () => {
      const result = await axios.get(`${URL}/post/posts/realtime/${productId}`);
      const { data } = result;
      setData((prevData) => {
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
      scrollToleft();
    }, 1500);
    scrollToleft();

    return () => clearInterval(interval);
  }, [productId]);

  return (
    <div className="flex">
      <Line options={options as any} data={data} width={600} height={600} />
      <div ref={chartRef} />
    </div>
  );
}

export default BizPriceChart;
