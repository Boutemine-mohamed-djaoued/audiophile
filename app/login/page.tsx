"use client";
import { useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import Button from "../util/components/Button";
import Link from "next/link";
import { useUserDataContext } from "../context/userContext";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
const page = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useUserDataContext();
  const router = useRouter();
  const { toast } = useToast();
  
  const mutation = useMutation(
    async (loginData: { username: string; password: string }) => {
      const response = await axios.post("/api/user/login", loginData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    },
    {
      onSuccess: (data) => {
        setUser(data);
        router.push("/");
        setLoading(false);
      },
      onError: (error: any) => {
        toast({
          description: error.response.data.error,
          variant: "destructive",
        });
        setLoading(false);
      },
    }
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    mutation.mutate({ username, password });
  };

  return (
    <section className="mx-auto max-lg:my-10 lg:my-32 max-lg:w-[calc(100%-2.5rem)] lg:max-w-[30rem] rounded-2xl bg-white max-lg:p-5 lg:p-10 shadow-md">
      <h1>Login</h1>
      <p className="mb-4 font-medium opacity-60">Get the best audio gear</p>
      <Link href="/api/user/google" className="flex w-full items-center justify-center gap-2 rounded-full py-2 ring-[2px] ring-black ring-opacity-10">
        <FcGoogle />
        <span className="font-semibold">Sign in with Google</span>
      </Link>
      <div className="relative my-5 h-[2px] rounded-full bg-black bg-opacity-10">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white font-medium">
          <div className="mx-4 min-w-max opacity-60">or Sign in with Username</div>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username" className="font-medium">
          Username
        </label>
        <br />
        <input className="form-input my-2" type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} minLength={3} required />
        <br />
        <label htmlFor="password" className="font-medium">
          Password
        </label>
        <br />
        <input className="form-input my-2" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <Button isLoading={loading} className="mb-3 mt-4 !w-full rounded" type="submit">
          Login
        </Button>
      </form>
      <p>
        Not registered yet?
        <Link href="/register" className="!text-accent">
          {" "}
          Create an Account
        </Link>
      </p>
    </section>
  );
};

export default page;
