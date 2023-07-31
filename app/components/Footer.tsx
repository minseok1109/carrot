"use client";

import { MAKEPRICE } from "../constant";
import InputModal from "./InputModal";
import { useEffect, useState } from "react";
import socket from "@/utils/socket";

const Footer = ({
  productPrice,
  productId,
  userId,
}: {
  productPrice: number;
  productId: string;
  userId: number;
}) => {
  const [price, setPrice] = useState(MAKEPRICE(productPrice));

  useEffect(() => {
    socket.on("connect", () => {
      console.log("socket connected");
    });

    socket.on("sendPriceToClient", (data) => {
      const { post_id, price } = data;
      if (post_id === productId) {
        setPrice(MAKEPRICE(price));
      }
    });

    return () => {
      socket.off("connect");
    };
  }, [productId]);

  return (
    <footer className="sticky top-[88vh] items-center p-4 footer bg-neutral text-neutral-content rounded-xl">
      <div className="items-center grid-flow-col text-2xl font-bold">
        {price}
      </div>
      <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <InputModal
          productPrice={productPrice}
          productId={productId}
          userId={userId}
        />
      </div>
    </footer>
  );
};

export default Footer;
