"use client";
import { Container } from "react-bootstrap";
import Stats from "./components/Stats";
import axios from "axios";
import { useQuery } from "react-query";
import Products from "./components/Products";
import Orders from "./components/Orders";
import DashBoardSkeleton from "./DashBoardSkeleton";
const getDashboard = async () => {
  const response = await axios.get("/api/stats");
  return response.data;
};

const page = () => {
  const { data, isLoading , isError } = useQuery("dashboard", getDashboard);
  if (isLoading || isError) return <DashBoardSkeleton></DashBoardSkeleton>
  return (
    <Container>
      <section className="mt-10 overflow-clip rounded-2xl bg-white shadow-md">
        <div className="flex">
          <div className="flex-1 p-10 pe-4">
            <h2 className="mb-0 uppercase">dashboard</h2>
            <Stats {...data.stats[0]}></Stats>
            <Orders orders={data.orders}></Orders>
          </div>
          <div className="min-w-[25rem] bg-[#f7f7f7] p-10 ps-4">
            <Products products={data.products}></Products>
          </div>
        </div>
      </section>
    </Container>
  );
};
export default page;
