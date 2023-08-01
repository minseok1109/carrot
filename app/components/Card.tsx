import { Product } from "@/utils/type";
import Image from "next/image";
import PriceButton from "./PriceButton";

interface Props {
  product: Product;
}

const Card = ({ product }: Props) => {
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
        <PriceButton product={product} />
      </div>
    </div>
  );
};

export default Card;
