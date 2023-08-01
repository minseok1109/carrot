"use client";

import { Product } from "@/utils/type";
import { MAKEPRICE } from "../constant";
import { useEffect, useState } from "react";
import socket from "@/utils/socket";

interface Props {
  product: Product;
}
const PriceButton = ({ product }: Props) => {
  const [bizPrice, setBizPrice] = useState(
    product.biz_count > 0 ? product.biz_price : product.min_price
  );
  useEffect(() => {
    socket.on("connect", () => {
      console.log(`pricebutton socket connected ${socket.id}`);
    });

    socket.on("sendPriceToClient", (data) => {
      const { post_id, price } = data;
      if (post_id === product.post_id) {
        console.log("have to change price");
        setBizPrice(price);
      }
    });

    return () => {
      socket.off("connect");
    };
  }, [product.post_id, bizPrice, setBizPrice]);

  return (
    <div className="justify-end card-actions">
      <span className="btn btn-primary">
        {product.biz_count > 0
          ? MAKEPRICE(bizPrice)
          : MAKEPRICE(product.min_price)}
      </span>
    </div>
  );
};

export default PriceButton;
