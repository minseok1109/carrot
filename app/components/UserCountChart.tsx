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
      ticks: {
        stepSize: 1,
      },
    },
  },
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
};

//중복된 유저 카운트
function countDuplicates(arr: string[]) {
  const countMap: {
    [key: string]: number;
  } = {};

  for (const item of arr) {
    countMap[item] = (countMap[item] || 0) + 1;
  }

  const duplicates: {
    [key: string]: number;
  } = {};
  for (const key in countMap) {
    if (countMap[key] > 1) {
      duplicates[key] = countMap[key];
    }
  }

  return duplicates;
}

function UserCountChart({
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

      //x축 라벨
      const labels = data.map((item: BizPriceType) =>
        dayjs(item.createdAt).format("MM-DD HH:mm")
      );

      //y축 데이터
      const userCount = Object.values(countDuplicates(data));
      console.log(countDuplicates(labels));

      setData({
        labels,
        datasets: [
          {
            label,
            yAxisID: "y-right",
            data: userCount,
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

    let currentLabels: string[] = [];
    let currentUserCount: number[] = [];

    const interval = setInterval(async () => {
      const result = await axios.get(`${URL}/post/posts/biz/${productId}`);
      const { data } = result;

      //새로운 날짜 추가
      const newLabel = dayjs(data.slice(-1)[0].createdAt).format("MM-DD HH:mm");
      const newCount = data.length;

      currentLabels.push(newLabel);
      currentUserCount.push(newCount);

      // Limit the arrays to the same length to ensure 1:1 correspondence
      const maxLength = 10; // Adjust this value as needed
      if (currentLabels.length > maxLength) {
        currentLabels.shift();
      }
      if (currentUserCount.length > maxLength) {
        currentUserCount.shift();
      }

      setData((prevData) => {
        return {
          labels: currentLabels,
          datasets: [
            {
              ...prevData.datasets[0],
              data: currentUserCount,
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

export default UserCountChart;
