"use client";
import Image from "next/image";
import { Container } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaFacebookSquare, FaTelegram } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import Link from "next/link";
const Footer = () => {
  const routes = [
    { name: "HOME", path: "/" },
    { name: "HEADPHONES", path: "/categories/HEADPHONES" },
    { name: "SPEAKERS", path: "/categories/SPEAKERS" },
    { name: "EARPHONES", path: "/categories/EARPHONES" },
  ];
  return (
    <footer className="mt-24 lg:mt-40 bg-off-black">
      <Container className="relative lg:flex justify-between py-10 lg:py-20">
        <div className="absolute max-lg:left-1/2 max-lg:-translate-x-1/2 lg:left-3 top-0 h-1 w-32 bg-accent"></div>
        <div className="text-white text-opacity-50">
          <Image className="mb-4 max-lg:mx-auto" src="/logo.svg" alt="audiophile" width={150} height={100}></Image>
          <p className="mb-5 max-lg:mx-auto max-lg:text-center max-w-[58ch]">
            Audiophile is an all in one stop to fulfill your audio needs. We're a small team of music lovers and sound specialists who are devoted to helping you get the most out of personal audio.
            Come and visit our demo facility - we’re open 7 days a week.
          </p>
          <p className="max-lg:text-center">Copyright {new Date().getFullYear()}. All Rights Reserved</p>
        </div>
        <div className="flex flex-col justify-between">
          <div className="max-lg:hidden">
            <Navbar>
              <Nav className="mx-auto gap-4 font-medium text-white">
                {routes.map((route) => (
                  <Link key={route.name} className="hover:!text-accent" href={route.path}>
                    {route.name}{" "}
                  </Link>
                ))}
              </Nav>
            </Navbar>
          </div>
          <div className="max-lg:me-auto ms-auto flex gap-3">
            <FaFacebookSquare className="text-white" size={35} />
            <RiInstagramFill className="text-white" size={35} />
            <FaTelegram className="text-white" size={35} />
          </div>
        </div>
      </Container>
    </footer>
  );
};
export default Footer;
