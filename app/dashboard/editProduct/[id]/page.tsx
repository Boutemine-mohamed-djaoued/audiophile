"use client";
import Button from "../../../util/components/Button";
import axios from "axios";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useMutation, useQuery } from "react-query";
import { useToast } from "../../../../components/ui/use-toast";
import { Info } from "../../addProduct/Info";
import { MainImage } from "../../addProduct/MainImage";
import { Features } from "../../addProduct/Features";
import { InBox } from "../../addProduct/InBox";
import OtherImages from "../../addProduct/OtherImages";

import { useRouter } from "next/navigation";
import React from "react";
interface pageProps {
  params: {
    id: string;
  };
}
const page = ({ params: { id } }: pageProps) => {
  const [features, setFeatures] = useState<string[]>([""]);
  const [inBox, setInBox] = useState<{ item: string; quantity: number }[]>([{ item: "", quantity: 0 }]);
  const [mainImage, setMainImage] = useState("");
  const [info, setInfo] = useState({
    name: "",
    description: "",
    price: 0,
    inStock: 0,
    category: "HEADPHONES",
  });
  const [otherImages, setOtherImages] = useState<string[]>(["", "", ""]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const { mutate } = useMutation(
    (newProduct: any) => {
      return axios.put(`/api/product/${id}`, newProduct, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    {
      onSuccess: () => {
        setLoading(false);
        router.push("/dashboard");
        toast({ description: "Product Edited successfully." });
      },
      onError: (error) => {
        setLoading(false);
        toast({
          description: "Failed To Edit Product.",
          variant: "destructive",
        });
      },
    }
  );

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const newProduct = { ...info, features, inBox, mainImage, otherImages };
    mutate(newProduct);
  };

  const { data, isLoading } = useQuery(`get-product-${id}`, async () => {
    const response = await axios.get(`/api/product/${id}`);
    return response.data;
  });
  useEffect(() => {
    if (data) {
      setFeatures(data.features);
      setInBox(data.inBox);
      setMainImage(data.mainImage);
      setOtherImages(data.otherImages);
      setInfo({ category: data.category, name: data.name, description: data.description, price: data.price, inStock: data.inStock });
    }
  }, [data]);

  return (
    <Container>
      <form className="my-10 rounded-2xl bg-white p-10 shadow-md" onSubmit={handleAddProduct}>
        <h2 className="mb-5">Edit Product</h2>
        <h3 className="text-accent">General Info</h3>
        <div className="flex items-center gap-10">
          <Info info={info} setInfo={setInfo} />
          <MainImage onChange={setMainImage} />
        </div>
        <div className="my-10 flex gap-10">
          <Features features={features} setFeatures={setFeatures} />
          <InBox inBox={inBox} setInBox={setInBox} />
        </div>
        <OtherImages setOtherImages={setOtherImages}></OtherImages>
        <div className="mt-5 flex justify-end gap-3">
          <Button href="/dashboard" role="secondary-light">
            Back
          </Button>
          <Button type="submit" className="ring-1 ring-accent" isLoading={loading}>
            Edit Product
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default page;
