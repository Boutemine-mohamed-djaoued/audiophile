import Image from "next/image";
import Button from "@/app/util/components/Button";
import Link from "next/link";
interface recomondationProps {
  product: {
    id: string;
    name: string;
    mainImage: string;
  };
}
const Recomondation = ({ product }: recomondationProps) => {
  return (
    <div className="flex-1 max-lg:my-10">
      <div className="lg:aspect-square max-lg:w-fit max-lg:mx-auto rounded-lg bg-grey py-10 px-24 lg:p-16">
        <Image className="h-full max-lg:mx-auto lg:w-full" src={product.mainImage} alt="" width={100} height={100}></Image>
      </div>
      <div>
        <h3 className="max-lg:my-5 lg:mb-8 lg:mt-10 text-center">{product.name}</h3>
        <Button className="mx-auto max-md:!text-[0.7em]" href={`/products/${product.id}`}>
          See Product
        </Button>
      </div>
    </div>
  );
};
const Recomondations = () => {
  const products = [
    {
      id: "66bf7017b05d254fa9b49362",
      name: "XX99 MARK I",
      mainImage: "/mainHeadPhones.svg",
    },
    {
      id: "66bf6250b05d254fa9b491ad",
      name: "XX59",
      mainImage: "/whiteHeadPhones.svg",
    },
    {
      id: "66bf88e5b05d254fa9b49741",
      name: "ZX9 SPEAKER",
      mainImage: "/mainSpeaker.svg",
    },
  ];
  return (
    <section className="mt-16 mb-48 lg:my-32">
      <h2 className="mb-5 text-center font-semibold uppercase">you may also like</h2>
      <div className="lg:flex gap-10">
        {products.map((product: any, index) => {
          return <Recomondation product={product} key={index} />;
        })}
      </div>
    </section>
  );
};
export default Recomondations;
