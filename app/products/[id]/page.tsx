import Footer from "@/app/components/Footer";
import Timer from "@/app/components/Timer";
import { PRODUCTS_URL } from "@/app/constant";
import { getProductData, getUser } from "@/utils/api";
import { Product } from "@/utils/types";
import Image from "next/image";
import BizPriceChart from "@/app/components/BizPriceChart";
import UserCountChart from "@/app/components/UserCountChart";

export async function generateStaticParams() {
  const products = await fetch(PRODUCTS_URL).then((res) => res.json());
  return (
    products &&
    products.map((product: Product) => ({
      id: product.post_id.toString(),
    }))
  );
}

export default async function Page({ params }: { params: { id: string } }) {
  const product: Product = await getProductData(params);
  const user = await getUser();

  return (
    <>
      <div className="max-w-[63rem] min-w-fit p-4 space-x-4 carousel bg-neutral rounded-box">
        <div className="carousel-item">
          {product &&
            product?.photo_ip?.map((image: string) => (
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
      <div className="mt-6 text-xl">{product.content}</div>
      <div className="flex justify-center mt-10">
        <Timer dueToDate={product.dueToDate} />
      </div>
      <div className="flex justify-around">
        <BizPriceChart
          productId={product.post_id}
          lineColor="rgb(255, 99, 132)"
          label="실시간 입찰 가격"
        />
        <UserCountChart
          productId={product.post_id}
          lineColor="rgb(0, 255, 255)"
          label="실시간 입찰자 수"
        />
      </div>
      <Footer
        productBizPrice={product.biz_price}
        productPrice={product.min_price}
        productId={product.post_id}
        userId={user.user_id}
      />
    </>
  );
}
