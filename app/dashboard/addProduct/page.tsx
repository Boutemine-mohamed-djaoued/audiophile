"use client";
import Button from "@/app/util/components/Button";
import axios from "axios";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useMutation } from "react-query";
import { Features } from "./Features";
import { InBox } from "./InBox";
import { Info } from "./Info";
import { MainImage } from "./MainImage";
import OtherImages from "./OtherImages";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
const page = () => {
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
      return axios.post("/api/product", newProduct, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    {
      onSuccess: () => {
        setLoading(false);
        router.push("/dashboard");
        toast({ description: "Product added successfully." });
      },
      onError: (error : any) => {
        setLoading(false);
        toast({
          description: error.response.data.errors,
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

  return (
    <Container>
      <form className="my-10 rounded-2xl bg-white p-10 shadow-md" onSubmit={handleAddProduct}>
        <h2 className="mb-5">Add New Product</h2>
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
            Add Product
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default page;
