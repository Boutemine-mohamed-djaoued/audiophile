"use client";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMutation } from "react-query";
import Button from "../util/components/Button";
const page = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoding] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();
  const { toast } = useToast();
  const mutation = useMutation(
    async (registerData: { username: string; password: string; email: string }) => {
      const response = await axios.post("/api/user/register", registerData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    },
    {
      onSuccess: () => {
        toast({
          description: "Account Created Successfully",
        });
        router.push("/login");
        setLoding(false);
      },
      onError: (error: any) => {
        console.log(error);
        toast({
          description: error.response.data ,
          variant: "destructive",
        });
        setLoding(false);
      },
    }
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoding(true);
    mutation.mutate({ username, password, email });
  };

  return (
    <section className="mx-auto my-10 lg:my-32 max-md:w-[calc(100%-2.5rem)] md:max-w-[30rem] rounded-2xl bg-white max-lg:p-5 lg:p-10 shadow-md">
      <h1>Register</h1>
      <p className="mb-4 font-medium opacity-60">Get the best audio gear</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username" className="font-medium">
          Username
        </label>
        <br />
        <input className="form-input my-2" type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} minLength={3} required />
        <br />
        <label htmlFor="password" className="font-medium">
          Email
        </label>
        <br />
        <input className="form-input my-2" type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label htmlFor="email" className="font-medium">
          Password
        </label>
        <br />
        <input className="form-input my-2" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <Button isLoading={loading} className="mb-3 mt-4 !w-full rounded" type="submit">
          Register
        </Button>
      </form>
      <p>
        Already registered?
        <Link href="/login" className="!text-accent">
          {" "}
          Login To Your Account
        </Link>
      </p>
    </section>
  );
};

export default page;
