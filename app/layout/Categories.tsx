import Image from "next/image";
import Link from "next/link";
import { Container } from "react-bootstrap";
import Button from "../util/components/Button";
interface categoryProps {
  link: string;
  image: string;
  name: string;
}

const Category = ({ link, image, name }: categoryProps) => {
  return (
    <div className="relative max-md:mx-2 max-lg:mt-[5rem] grid flex-1 grid-rows-[3rem_3rem_1fr]">
      <Image className="absolute bottom-0 left-1/2 row-span-2 row-start-1 -translate-x-1/2" src={image} alt="" width={130} height={130}></Image>
      <div className="row-span-2 row-start-2 rounded-md bg-grey pt-[5rem]">
        <span className="mx-auto block h-5 w-28 rounded-full bg-grey shadow-[0px_-45px_24px_rgba(0,0,0,0.35)]"></span>
        <h3 className="text-center text-400">{name}</h3>
        <Button role="link" className="mx-auto" href={link}>
          shop
        </Button>
      </div>
    </div>
  );
};

const Categories = () => {
  const myCategories = [
    {
      link: "/categories/HEADPHONES",
      image: "/mainHeadPhones.svg",
      name: "HEADPHONES",
    },
    {
      link: "/categories/SPEAKERS",
      image: "/mainSpeaker.svg",
      name: "SPEAKERS",
    },
    {
      link: "/categories/EARPHONES",
      image: "/mainEarPuds.svg",
      name: "EARPHONES",
    },
  ];
  return (
    <Container>
      <section className="mt-40 mb-24 lg:my-40 lg:flex gap-10">
        {myCategories.map((category, index) => {
          return <Category key={index} {...category} />;
        })}
      </section>
    </Container>
  );
};
export default Categories;
