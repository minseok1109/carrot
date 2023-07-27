import InputModal from "@/app/components/InputModal";
import { BID, MAKEPRICE, PRODUCTS_URL } from "@/app/constant";
import { getProductData } from "@/utils/api";
import { Product } from "@/utils/type";
import Image from "next/image";

export async function generateStaticParams() {
  const { products } = await fetch(PRODUCTS_URL).then((res) => res.json());

  return products.map((product: Product) => ({
    id: product.id.toString(),
  }));
}

export default async function Page({ params }: { params: { id: string } }) {
  const product = await getProductData(params);
  return (
    <>
      <div className="max-w-[63rem] min-w-fit p-4 space-x-4 carousel bg-neutral rounded-box">
        <div className="carousel-item">
          {product &&
            product.images.map((image: string) => (
              <Image
                key={image}
                src={image}
                width={300}
                height={300}
                className="object-cover mr-4 rounded-box aspect-square"
                alt="Product Images"
              />
            ))}
        </div>
      </div>
      <div>{product.description}</div>
      <div>{MAKEPRICE(product.price)}</div>
      <InputModal productPrice={product.price} productId={params.id} />
    </>
  );
}
