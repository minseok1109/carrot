import { getProductsData } from "@/utils/api";
import { Product } from "@/utils/type";
import Image from "next/image";
import Link from "next/link";
import { MAKEPRICE } from "./constant";

export default async function Home() {
  const { products } = await getProductsData();
  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      {products.map((product: Product) => (
        <Link href={`products/${product.id}`} key={product.id}>
          <div className="flex w-[62.5rem] h-full my-5 shadow-xl card card-side bg-base-100">
            <figure>
              <Image
                src={product.thumbnail}
                width={300}
                height={300}
                alt="Movie"
                className="object-cover w-[300px] h-[300px]"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{product.title}</h2>
              <p>{product.description}</p>
              <div className="justify-end card-actions">
                <span className="btn btn-primary">
                  {MAKEPRICE(product.price)}
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </main>
  );
}
