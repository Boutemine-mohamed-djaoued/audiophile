// components/Header.js
"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useMutation, useQuery } from "react-query";
import { useUserDataContext } from "../context/userContext";
import { RxHamburgerMenu } from "react-icons/rx";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import Cart from "./Cart";
function Header() {
  const { user, setUser } = useUserDataContext();
  const { toast } = useToast();
  const router = useRouter();
  const routes = [
    { name: "HOME", path: "/" },
    { name: "HEADPHONES", path: "/categories/HEADPHONES" },
    { name: "SPEAKERS", path: "/categories/SPEAKERS" },
    { name: "EARPHONES", path: "/categories/EARPHONES" },
  ];
  useQuery("get-status", () => axios.get("/api/user/status"), {
    onSuccess: (response) => {
      setUser(response.data);
    },
  });
  const { mutate } = useMutation(
    async () => {
      await axios.post("/api/user/logout");
    },
    {
      onSuccess: () => {
        toast({
          description: "Loged Out Successfully",
        });
        router.push("/");
        setUser(null);
      },
      onError: (error: any) => {
        toast({
          description: error.response.data,
          variant: "destructive",
        });
      },
    }
  );
  const logout = async () => {
    mutate();
  };
  return (
    <div className="bg-off-black max-md:py-1 md:py-5 w-full z-50">
      <Navbar expand="md" className="font-medium text-white">
        <Container className="outline-white">
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="p-0 focus:outline-0">
            <RxHamburgerMenu className="text-white" size={30} />
          </Navbar.Toggle>
          <Link href="/">
            <Image className="max-lg:w-28" src="/logo.svg" alt="audiophile" width={150} height={100}></Image>
          </Link>
          <div className="md:hidden">
            {user ? (
              <Cart />
            ) : (
              <Link className="hover:!text-accent" href="/login">
                Log in
              </Link>
            )}
          </div>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto items-center md:gap-4">
              {routes.map((route, index) => (
                <Link
                  key={route.name}
                  className={`font-medium ring-white hover:!text-accent max-md:w-full max-md:py-2 ${index == 3 && user?.role != "admin" ? "border-b-0" : "max-md:border-b-2"} `}
                  href={route.path}>
                  {route.name}
                </Link>
              ))}
              {user && user.role === "admin" && (
                <Link className="hover:!text-accent max-md:pb-2 max-md:w-full max-md:pt-2" href="/dashboard">
                  DASHBOARD
                </Link>
              )}
              {user && (
                <button className="font-medium max-md:w-full max-md:text-left max-md:border-t-2 border-white max-md:pt-2" onClick={logout}>
                  LOGOUT
                </button>
              )}
            </Nav>
          </Navbar.Collapse>
          <div className="max-md:hidden">
            {user ? (
              <Cart />
            ) : (
              <Link className="hover:!text-accent" href="/login">
                Log in
              </Link>
            )}
          </div>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
