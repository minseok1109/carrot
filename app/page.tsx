import { getProductsData } from "@/utils/api";
import { Product } from "@/utils/type";
import Link from "next/link";
import Card from "./components/Card";

export default async function Home() {
  console.log(process.env.NODE_ENV);
  const products = await getProductsData();
  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      {products?.map((product: Product) => (
        <Link href={`products/${product.post_id}`} key={product.post_id}>
          <Card product={product} />
        </Link>
      ))}
    </main>
  );
}
