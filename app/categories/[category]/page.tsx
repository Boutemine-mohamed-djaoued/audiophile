"use client";
import { Product } from "@/app/types/product";
import axios from "axios";
import { Container } from "react-bootstrap";
import { useQuery } from "react-query";
import ProductList from "../ProductList";
import ProductsSkeleton from "../ProductsSkeleton";
interface pageProps {
  params: {
    category: string;
  };
}

const getCategoryProducts = async (category: string) => {
  const response = await axios.get<Product[]>(`/api/product/categories/${category}`);
  return response.data;
};

const page = ({ params: { category } }: pageProps) => {
  const { isLoading, data, isError } = useQuery<Product[]>(`get-all-${category}`, () => getCategoryProducts(category));
  return (
    <>
      <section className="bg-off-black">
        <Container className="border-t-[2px] border-[#333]">
          <h1 className="py-10 lg:py-24 text-center text-white">{category}</h1>
        </Container>
      </section>
      {isLoading || isError ? <ProductsSkeleton /> : data ? <ProductList products={data}></ProductList> : null}
    </>
  );
};
export default page;
