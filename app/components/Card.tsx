"use client";

import { Product } from "@/utils/type";
import Image from "next/image";
import { MAKEPRICE } from "../constant";
// import { useEffect } from "react";
// import socket from "@/utils/socket";

interface Props {
  product: Product;
}

const Card = ({ product }: Props) => {
  // useEffect(() => {
  //   socket.on("connect", () => {
  //     console.log("socket connected");
  //   });

  //   return () => {
  //     socket.off("connect");
  //   };
  // }, []);

  return (
    <div className="flex w-[62.5rem] h-full my-5 shadow-xl card card-side bg-base-100">
      <figure>
        <Image
          src={product.photo_ip[0]}
          width={300}
          height={300}
          alt="Movie"
          className="object-cover w-[300px] h-[300px]"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.title}</h2>
        <p>{product.content}</p>
        <div className="justify-end card-actions">
          <span className="btn btn-primary">
            {MAKEPRICE(product.min_price)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
