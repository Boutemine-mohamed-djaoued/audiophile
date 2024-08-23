"use client";
import { Product } from "@/app/types/product";
import Button from "@/app/util/components/Button";
import NumberInput from "@/app/util/components/NumberInput";
import isNewProduct from "@/app/util/helper/isNewProduct";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { useMutation, useQuery } from "react-query";
import ProductSkeleton from "./ProductSkeleton";
import Recomondations from "./Recomondations";
import { useRouter } from "next/navigation";
interface pageProps {
  params: {
    id: string;
  };
}

const addToCart = async (data: { productId: string; quantity: number }) => {
  const response = await axios.post("/api/cart", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

const getProduct = async (id: string) => {
  const response = await axios.get<Product>(`/api/product/${id}`);
  return response.data;
};

const page = ({ params: { id } }: pageProps) => {
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();
  const [loding, setLoding] = useState(false);
  const router = useRouter();
  const { mutate } = useMutation(addToCart, {
    onSuccess: () => {
      setLoding(false);
      toast({
        description: "Product Added Successfully To Cart",
      });
      refetch();
    },
    onError: (error: any) => {
      setLoding(false);
      toast({
        description: error.response.data,
        variant: "destructive",
      });
      if (error.response.data == "Not Authorized") router.push("/login");
    },
  });
  const { data: product, isLoading, isError , refetch} = useQuery<Product>(`get-product-${id}`, () => getProduct(id));
  if (isLoading || isError || !product) return <ProductSkeleton></ProductSkeleton>;
  return (
    <Container>
      <section className="max-lg:my-4 lg:my-32 text-400">
        <Link href={`/categories/${product.category}`} className="opacity-60 hover:!text-accent">
          Go Back
        </Link>
        <div className={`my-4 lg:my-10 lg:flex items-center gap-24`}>
          <div className="box-border aspect-square flex-1 rounded-lg bg-grey py-10 lg:py-20 max-lg:mb-5">
            <Image className="h-full w-full" src={product.mainImage} width={100} height={100} alt=""></Image>
          </div>
          <div className="flex-1">
            {isNewProduct(product.createdAt) && <p className="tracking-[10px] text-accent">NEW PRODUCT</p>}
            <h2 className="text-700">
              {product.name}
              <br />
              {product.category}
            </h2>
            <p className="my-4 lg:my-10 text-350 opacity-60">{product.description}</p>
            <p className="text-300 opacity-60">{product.inStock} left in stock</p>
            <h3>$ {product.price}</h3>
            <div className="mt-3 lg:mt-5 flex gap-3">
              <NumberInput value={quantity} onChange={setQuantity} max={product.inStock} min={1}></NumberInput>
              <Button
                onClick={() => {
                  mutate({ productId: id, quantity });
                  setLoding(true);
                }}
                className="uppercase max-md:!text-[0.7em]"
                isLoading={loding}>
                add to cart
              </Button>
            </div>
          </div>
        </div>
        <div className="my-16 lg:my-32 lg:flex gap-32">
          <div>
            <h3 className="mb-4 font-semibold">FEATURES</h3>
            <div>
              {product.features.map((feature, index) => {
                return (
                  <p className="opacity-60" key={index}>
                    {feature}
                  </p>
                );
              })}
            </div>
          </div>
          <div className="min-w-max max-lg:mt-16">
            <h3 className="mb-4 font-semibold">IN THE BOX</h3>
            <div>
              {product.inBox.map(({ item, quantity }, index) => {
                return (
                  <div key={index} className="flex gap-4">
                    <p className="font-medium text-accent">{quantity}x</p>
                    <p className="opacity-60">{item}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="lg:grid max-lg:flex max-lg:flex-col gap-4 lg:aspect-video grid-cols-[40%_60%] grid-rows-2">
          {product.otherImages.map((image, index) => {
            return (
              <div
                style={{
                  backgroundImage: image ? `url(${image})` : undefined,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                key={index}
                className={`rounded-lg w-full bg-grey lg:mb-4 ${index == 1 ? "col-start-2 row-span-2 lg:ms-7 max-lg:order-3 max-lg:aspect-square" : "max-lg:aspect-video"}`}></div>
            );
          })}
        </div>
        <Recomondations></Recomondations>
      </section>
    </Container>
  );
};
export default page;
