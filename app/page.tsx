import { getProductsData } from "@/utils/api";
import { Product } from "@/utils/type";
import Link from "next/link";
import axios from "axios";
import Card from "./components/Card";

export default async function Home() {
  const { products } = await getProductsData();
  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      {products.map((product: Product) => (
        <Link href={`products/${product.id}`} key={product.id}>
          <Card product={product} />
        </Link>
      ))}
    </main>
  );
}
